import { z } from "zod";
import { generateText } from "ai";
import { checkApiKey } from "@/lib/api-auth";
import { corsJson, preflight } from "@/lib/cors";

export const runtime = "nodejs";
export const maxDuration = 60;

const schema = z.object({
  imageUrl: z.string().url().optional(),
  pageTitle: z.string().max(500).optional(),
  pageUrl: z.string().url().optional(),
  pageText: z.string().max(5000).optional(),
  hint: z.string().max(500).optional(),
  locale: z.enum(["en", "ko"]).optional().default("en"),
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
  const parsed = schema.safeParse(json);
  if (!parsed.success) return corsJson({ error: "Validation failed" }, { status: 400 });
  const d = parsed.data;

  const langInstruction =
    d.locale === "ko"
      ? "Write the caption in natural Korean (한국어). Use Korean hashtags where natural."
      : "Write the caption in English.";

  const userParts: ({ type: "text"; text: string } | { type: "image"; image: URL })[] = [];
  const contextLines: string[] = [];
  if (d.pageTitle) contextLines.push(`Source title: ${d.pageTitle}`);
  if (d.pageUrl) contextLines.push(`Source URL: ${d.pageUrl}`);
  if (d.pageText) contextLines.push(`Source excerpt:\n${d.pageText}`);
  if (d.hint) contextLines.push(`User hint: ${d.hint}`);
  userParts.push({
    type: "text",
    text: contextLines.length
      ? contextLines.join("\n\n") + "\n\nWrite an Instagram marketing caption based on the above."
      : "Write an Instagram marketing caption for this image.",
  });
  if (d.imageUrl) userParts.push({ type: "image", image: new URL(d.imageUrl) });

  try {
    const { text } = await generateText({
      model: "anthropic/claude-sonnet-4-6",
      system:
        "You write Instagram captions for marketing. Punchy hook in line 1, 2-4 sentences of value, then 6-12 niche hashtags on the last line. No emojis unless the hint asks for them. " +
        langInstruction,
      messages: [{ role: "user", content: userParts }],
    });
    return corsJson({ caption: text });
  } catch (e) {
    return corsJson({ error: (e as Error).message }, { status: 500 });
  }
}
