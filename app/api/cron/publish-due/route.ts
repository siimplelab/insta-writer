import { NextResponse } from "next/server";
import { and, asc, eq, lte, sql } from "drizzle-orm";
import { db, schema } from "@/lib/db/client";
import { assertCron } from "@/lib/cron-auth";
import {
  publishPhoto,
  publishReel,
  publishCarousel,
  publishStoryImage,
  postFirstComment,
} from "@/lib/meta/publish";

export const runtime = "nodejs";
export const maxDuration = 300;

const BATCH = 5;

export async function GET() {
  try {
    await assertCron();
  } catch (r) {
    return r as Response;
  }

  const due = await db
    .select()
    .from(schema.posts)
    .where(
      and(
        eq(schema.posts.status, "queued"),
        lte(schema.posts.scheduledFor, new Date()),
      ),
    )
    .orderBy(asc(schema.posts.scheduledFor))
    .limit(BATCH);

  const results: { id: string; ok: boolean; error?: string }[] = [];

  for (const post of due) {
    const claim = await db
      .update(schema.posts)
      .set({ status: "publishing", attempts: sql`${schema.posts.attempts} + 1`, updatedAt: new Date() })
      .where(and(eq(schema.posts.id, post.id), eq(schema.posts.status, "queued")))
      .returning({ id: schema.posts.id });
    if (!claim.length) continue;

    const acct = await db.query.igAccounts.findFirst({
      where: eq(schema.igAccounts.id, post.accountId),
    });
    if (!acct) {
      await db
        .update(schema.posts)
        .set({ status: "failed", error: "account missing" })
        .where(eq(schema.posts.id, post.id));
      results.push({ id: post.id, ok: false, error: "account missing" });
      continue;
    }
    const media = await db.query.postMedia.findMany({
      where: eq(schema.postMedia.postId, post.id),
      orderBy: (m, { asc }) => [asc(m.order)],
    });
    const t = { token: acct.longLivedToken, igUserId: acct.igUserId };

    try {
      let mediaId: string;
      if (post.kind === "photo") {
        if (!media[0]) throw new Error("no media");
        mediaId = await publishPhoto(t, media[0].blobUrl, post.caption ?? undefined);
      } else if (post.kind === "reel") {
        if (!media[0]) throw new Error("no media");
        mediaId = await publishReel(t, media[0].blobUrl, post.caption ?? undefined);
      } else if (post.kind === "carousel") {
        mediaId = await publishCarousel(
          t,
          media.map((m) => ({
            url: m.blobUrl,
            kind: m.mime.startsWith("video/") ? "video" : "image",
          })),
          post.caption ?? undefined,
        );
      } else {
        if (!media[0]) throw new Error("no media");
        mediaId = await publishStoryImage(t, media[0].blobUrl);
      }

      if (post.firstComment) {
        try {
          await postFirstComment(t, mediaId, post.firstComment);
        } catch {
          /* non-fatal */
        }
      }

      await db
        .update(schema.posts)
        .set({ status: "posted", igMediaId: mediaId, error: null, updatedAt: new Date() })
        .where(eq(schema.posts.id, post.id));
      results.push({ id: post.id, ok: true });
    } catch (e) {
      const err = e instanceof Error ? e.message : String(e);
      await db
        .update(schema.posts)
        .set({ status: "failed", error: err, updatedAt: new Date() })
        .where(eq(schema.posts.id, post.id));
      results.push({ id: post.id, ok: false, error: err });
    }
  }

  return NextResponse.json({ processed: results.length, results });
}
