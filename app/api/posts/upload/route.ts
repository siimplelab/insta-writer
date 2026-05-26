import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      {
        error:
          "BLOB_READ_WRITE_TOKEN is not set. Install the Vercel Blob integration from the Marketplace and run `vercel env pull .env.local`.",
      },
      { status: 500 },
    );
  }

  let body: HandleUploadBody;
  try {
    body = (await req.json()) as HandleUploadBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  try {
    const json = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "video/mp4"],
        maximumSizeInBytes: 200 * 1024 * 1024,
      }),
      // NOTE: intentionally NOT defining `onUploadCompleted`.
      // When defined, Vercel Blob calls back to this route from its own servers,
      // which fails in local dev (Blob can't reach localhost without a tunnel).
      // The upload still completes — we get the URL on the client and persist
      // it via the `createScheduledPost` server action.
    });
    return NextResponse.json(json);
  } catch (e) {
    console.error("[upload] handleUpload error:", e);
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}
