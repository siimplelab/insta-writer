import { NextResponse, type NextRequest } from "next/server";
import { generateText } from "ai";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { imageUrl, hint } = (await req.json()) as { imageUrl?: string; hint?: string };
  if (!imageUrl) return NextResponse.json({ error: "imageUrl required" }, { status: 400 });

  const { text } = await generateText({
    model: "anthropic/claude-sonnet-4-6",
    system:
      "You write Instagram captions for marketing. Punchy hook in line 1, 2-4 sentences of value, then 6-12 niche hashtags on the last line. No emojis unless the hint asks for them.",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: hint ? `Hint: ${hint}` : "Write a caption for this image." },
          { type: "image", image: new URL(imageUrl) },
        ],
      },
    ],
  });

  return NextResponse.json({ caption: text });
}
