import { z } from "zod";
import { put } from "@vercel/blob";
import { db, schema } from "@/lib/db/client";
import { checkApiKey } from "@/lib/api-auth";
import { corsJson, preflight } from "@/lib/cors";

export const runtime = "nodejs";
export const maxDuration = 60;

const bodySchema = z.object({
  accountId: z.string().uuid(),
  kind: z.enum(["photo", "carousel", "reel", "story"]).default("photo"),
  caption: z.string().max(2200).optional(),
  firstComment: z.string().max(2200).optional(),
  // ISO timestamp; default = 1 hour from now → draft user can edit/reschedule
  scheduledFor: z.string().datetime().optional(),
  // Either supply already-uploaded blob URLs, or remote URLs we'll download.
  media: z
    .array(
      z.object({
        url: z.string().url(),
        // optional content type hint
        mime: z.string().optional(),
      }),
    )
    .min(1)
    .max(10),
  // If true, post is saved as 'draft' instead of 'queued'.
  asDraft: z.boolean().optional().default(true),
});

export async function OPTIONS() {
  return preflight();
}

export async function POST(req: Request) {
  const auth = checkApiKey(req);
  if (!auth.ok) return corsJson({ error: auth.reason }, { status: 401 });

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return corsJson({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return corsJson({ error: "Validation failed", issues: parsed.error.issues }, { status: 400 });
  }
  const data = parsed.data;

  // Verify the account exists
  const acct = await db.query.igAccounts.findFirst({
    where: (a, { eq }) => eq(a.id, data.accountId),
  });
  if (!acct) return corsJson({ error: "Account not found" }, { status: 404 });

  // Download each remote media URL into Vercel Blob (so IG can fetch from a
  // stable URL we control, with the right content-type).
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return corsJson(
      { error: "BLOB_READ_WRITE_TOKEN not configured on server" },
      { status: 500 },
    );
  }

  const blobs: { blobUrl: string; mime: string }[] = [];
  for (const m of data.media) {
    try {
      // If it's already a Vercel Blob URL, reuse it
      if (m.url.includes(".blob.vercel-storage.com")) {
        blobs.push({ blobUrl: m.url, mime: m.mime ?? "image/jpeg" });
        continue;
      }
      const r = await fetch(m.url);
      if (!r.ok) throw new Error(`fetch ${m.url} → ${r.status}`);
      const contentType = m.mime ?? r.headers.get("content-type") ?? "image/jpeg";
      const ext =
        contentType.includes("png") ? "png" :
        contentType.includes("webp") ? "webp" :
        contentType.includes("mp4") ? "mp4" : "jpg";
      const buf = Buffer.from(await r.arrayBuffer());
      const placed = await put(`drafts/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`, buf, {
        access: "public",
        contentType,
      });
      blobs.push({ blobUrl: placed.url, mime: contentType });
    } catch (e) {
      return corsJson(
        { error: `Failed to ingest media ${m.url}: ${(e as Error).message}` },
        { status: 400 },
      );
    }
  }

  const scheduledFor = data.scheduledFor
    ? new Date(data.scheduledFor)
    : new Date(Date.now() + 60 * 60_000); // 1h from now default

  const [post] = await db
    .insert(schema.posts)
    .values({
      accountId: data.accountId,
      kind: data.kind,
      caption: data.caption,
      firstComment: data.firstComment,
      scheduledFor,
      status: data.asDraft ? "draft" : "queued",
    })
    .returning({ id: schema.posts.id });

  await db.insert(schema.postMedia).values(
    blobs.map((b, i) => ({
      postId: post.id,
      blobUrl: b.blobUrl,
      mime: b.mime,
      order: i,
    })),
  );

  return corsJson({ id: post.id, status: data.asDraft ? "draft" : "queued" });
}
