import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as HandleUploadBody;
  try {
    const json = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "video/mp4"],
        maximumSizeInBytes: 200 * 1024 * 1024,
      }),
      onUploadCompleted: async () => {
        /* could persist a draft media reference here */
      },
    });
    return NextResponse.json(json);
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}
