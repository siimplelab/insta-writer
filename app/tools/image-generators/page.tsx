import Link from "next/link";
import { ArrowLeft, ExternalLink, Sparkles } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const dynamic = "force-dynamic";

type Tool = {
  name: string;
  url: string;
  bestFor: string;
  take: string;
  tags: { label: string; variant?: "default" | "secondary" | "outline" | "success" | "warning" | "info" }[];
};

type Section = {
  title: string;
  intro: string;
  items: Tool[];
};

const SECTIONS: Section[] = [
  {
    title: "Flagship general-purpose",
    intro: "The five you'll actually pick from for 90% of jobs. If you only learn one, learn Midjourney.",
    items: [
      {
        name: "Midjourney v7",
        url: "https://www.midjourney.com/",
        bestFor: "Stylized hero imagery, brand moodboards, illustration",
        take:
          "Still the best for aesthetic, art-directed output. Web app is finally good (Discord-only era is over). No official API — work in browser, export.",
        tags: [{ label: "Subscription", variant: "secondary" }, { label: "General", variant: "outline" }],
      },
      {
        name: "ChatGPT — GPT Image 1",
        url: "https://chatgpt.com/",
        bestFor: "Conversational refinement, multi-turn edits",
        take:
          "Strong prompt adherence and great at iterating in conversation. Stylistic range is narrower than Midjourney. Bundled with ChatGPT Plus — no extra fee.",
        tags: [{ label: "Subscription", variant: "secondary" }, { label: "Conversational", variant: "outline" }],
      },
      {
        name: "Google Gemini / Imagen 4",
        url: "https://gemini.google.com/",
        bestFor: "Fast iteration, strong text-in-image",
        take:
          "The free tier is generous and the text-rendering is genuinely best-in-class. Style range is corporate-clean — fine for marketing, lacks Midjourney's character.",
        tags: [{ label: "Free tier", variant: "success" }, { label: "Text-in-image", variant: "info" }],
      },
      {
        name: "Black Forest Labs — Flux Pro 1.1",
        url: "https://blackforestlabs.ai/",
        bestFor: "Anyone wiring image gen into their own product",
        take:
          "Best open-weights family. Available via fal.ai and Replicate APIs — most indie SaaS that ships image gen uses Flux behind the scenes. Photoreal quality rivals Midjourney.",
        tags: [{ label: "API", variant: "secondary" }, { label: "Open-source", variant: "outline" }],
      },
      {
        name: "Recraft V3",
        url: "https://www.recraft.ai/",
        bestFor: "Logos, vector illustrations, brand-consistent assets",
        take:
          "The only one that does proper vector + brand-style consistency across a set. If you need 10 illustrations that look like they came from the same designer, this is it.",
        tags: [{ label: "Subscription", variant: "secondary" }, { label: "Vector / brand", variant: "info" }],
      },
    ],
  },
  {
    title: "Specialty",
    intro: "Each one is best-in-class for a specific job. Don't use them as your daily driver.",
    items: [
      {
        name: "Ideogram 2.0",
        url: "https://ideogram.ai/",
        bestFor: "Reliable typography inside images",
        take:
          "When you need a poster, magazine cover, ad layout with real text rendered into the image. Most others mangle text; Ideogram doesn't.",
        tags: [{ label: "Free tier", variant: "success" }, { label: "Text-in-image", variant: "info" }],
      },
      {
        name: "Adobe Firefly",
        url: "https://firefly.adobe.com/",
        bestFor: "Commercial-safe imagery, Photoshop generative fill",
        take:
          "Trained on Adobe Stock + licensed data — the only major model with a clean copyright story. Quality is mid-pack but the legal certainty matters if you're scaling.",
        tags: [{ label: "Subscription", variant: "secondary" }, { label: "Commercial-safe", variant: "info" }],
      },
      {
        name: "Krea AI",
        url: "https://www.krea.ai/",
        bestFor: "Realtime brainstorming, sketch-to-image",
        take:
          "Realtime generation while you sketch or adjust prompts. Best for the ideation phase — see 50 variations in a minute, then refine elsewhere.",
        tags: [{ label: "Subscription", variant: "secondary" }, { label: "Realtime", variant: "outline" }],
      },
      {
        name: "Leonardo.ai",
        url: "https://leonardo.ai/",
        bestFor: "Gamedev assets, character sheets, large free tier",
        take:
          "Big free daily allowance, broad model library, character-consistency tools that other platforms charge extra for. Quality varies by model — pick carefully.",
        tags: [{ label: "Free tier", variant: "success" }, { label: "Assets", variant: "outline" }],
      },
      {
        name: "Magnific AI",
        url: "https://magnific.ai/",
        bestFor: "Upscaling + relighting existing images",
        take:
          "Not generation from scratch — takes a 512px image and turns it into a 4K masterpiece, or relights an existing photo. Expensive but uniquely capable.",
        tags: [{ label: "Per-image", variant: "secondary" }, { label: "Upscaling", variant: "outline" }],
      },
      {
        name: "Stable Diffusion 3.5 / SDXL",
        url: "https://stability.ai/",
        bestFor: "Total control, self-hosting, fine-tuning on your style",
        take:
          "Run locally via ComfyUI or Automatic1111. Steep learning curve but unmatched control — LoRA training on your brand assets is a real workflow once you commit.",
        tags: [{ label: "Open-source", variant: "outline" }, { label: "Self-host", variant: "outline" }],
      },
    ],
  },
  {
    title: "Worth knowing about",
    intro: "Niche, newer, or accessible-but-not-our-default. Useful in specific cases.",
    items: [
      {
        name: "Freepik AI Suite",
        url: "https://www.freepik.com/ai",
        bestFor: "Accessible UI bundling multiple models",
        take:
          "Multiple models (Mystic, Flux, Imagen) behind one UI with a generous free tier. Lower ceiling than a dedicated Flux or Midjourney workflow, but easy.",
        tags: [{ label: "Free tier", variant: "success" }, { label: "All-in-one", variant: "outline" }],
      },
      {
        name: "Lexica",
        url: "https://lexica.art/",
        bestFor: "Prompt research + discovery + generation",
        take:
          "Search a database of others' prompts + outputs. Use it to find the right prompt patterns before generating elsewhere. Underrated for prompt engineering.",
        tags: [{ label: "Free tier", variant: "success" }, { label: "Discovery", variant: "outline" }],
      },
      {
        name: "Reve.art",
        url: "https://reve.art/",
        bestFor: "Photoreal portraits and product shots",
        take:
          "Newer entrant with very strong photorealism. Free tier exists. Watch this one — the trajectory is steep.",
        tags: [{ label: "Free tier", variant: "success" }, { label: "Photoreal", variant: "info" }],
      },
      {
        name: "Higgsfield",
        url: "https://higgsfield.ai/",
        bestFor: "Motion-aware images, cinematic angles",
        take:
          "Image+motion crossover. Useful if your next stop is animating the image (with Veo / Sora / Runway). Niche but growing.",
        tags: [{ label: "Subscription", variant: "secondary" }, { label: "Niche", variant: "outline" }],
      },
      {
        name: "fal.ai",
        url: "https://fal.ai/",
        bestFor: "API access to many models in one place",
        take:
          "Not a model — a host. Flux, SDXL, Stable Diffusion variants behind a unified API. The most common starting point for developers shipping image gen in their own product.",
        tags: [{ label: "API", variant: "secondary" }, { label: "Developer", variant: "outline" }],
      },
      {
        name: "Replicate",
        url: "https://replicate.com/",
        bestFor: "API + a wider catalog including weird experimental models",
        take:
          "Same idea as fal.ai but with a long tail of community models. Slower-feeling but cheaper for some workloads.",
        tags: [{ label: "API", variant: "secondary" }, { label: "Developer", variant: "outline" }],
      },
    ],
  },
];

export default async function ImageGenerators() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10 md:py-12 space-y-10">
      <Button variant="ghost" size="sm" className="-ml-3" asChild>
        <Link href="/tools"><ArrowLeft className="h-4 w-4" /> All tools</Link>
      </Button>

      <header className="space-y-3">
        <Badge variant="secondary">Catalog · 16 services</Badge>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          AI image generators
        </h1>
        <p className="text-lg text-muted-foreground">
          Widely-used image-generation services in 2026, with one-line honest
          assessments. Each entry links out to the service. None of these run
          locally in this app — for templates with text overlays, use our{" "}
          <Link
            href="/tools/visual-builder"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Visual Builder
          </Link>{" "}
          instead.
        </p>
      </header>

      <Alert variant="info">
        <Sparkles className="h-4 w-4" />
        <AlertTitle>The indie-founder stack — if you only pick 3</AlertTitle>
        <AlertDescription>
          <ol className="ml-1 mt-2 list-decimal space-y-1 pl-5">
            <li>
              <span className="font-semibold">Midjourney v7</span> — for any
              hero / brand / mood imagery. Pay for it. It compounds.
            </li>
            <li>
              <span className="font-semibold">Ideogram 2.0</span> — only when
              you need text inside the image (posters, ad layouts).
            </li>
            <li>
              <span className="font-semibold">ChatGPT Plus (GPT Image 1)</span>{" "}
              — already in your pocket if you have ChatGPT. Use for quick
              iteration in conversation.
            </li>
          </ol>
        </AlertDescription>
      </Alert>

      <Alert variant="warning">
        <AlertTitle>What to NOT use AI imagery for</AlertTitle>
        <AlertDescription>
          <ul className="ml-1 mt-2 list-disc space-y-1 pl-5">
            <li>
              Your actual product UI screenshots — show the real thing.
            </li>
            <li>
              Talking-head shots of you or your team — uncanny in 2026, signals
              low effort.
            </li>
            <li>
              Anything that needs precise text — except via Ideogram or our
              Visual Builder.
            </li>
            <li>
              App Store screenshots — use a Figma template instead (see{" "}
              <Link href="/guides/design-automation" className="font-medium underline-offset-4 hover:underline">
                design-automation
              </Link>
              ).
            </li>
          </ul>
        </AlertDescription>
      </Alert>

      {SECTIONS.map((section) => (
        <section key={section.title} className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              {section.title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{section.intro}</p>
          </div>
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {section.items.map((tool) => (
              <li key={tool.name}>
                <Card className="flex h-full flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base">
                        <a
                          href={tool.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 hover:underline"
                        >
                          {tool.name}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </CardTitle>
                    </div>
                    <CardDescription className="text-xs uppercase tracking-wide">
                      Best for: {tool.bestFor}
                    </CardDescription>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {tool.tags.map((tag) => (
                        <Badge
                          key={tag.label}
                          variant={tag.variant ?? "outline"}
                          className="text-[10px]"
                        >
                          {tag.label}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    {tool.take}
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <Alert>
        <AlertTitle>Need to brief these tools systematically?</AlertTitle>
        <AlertDescription>
          The <Link href="/skills/social-image-spec" className="font-medium underline-offset-4 hover:underline">social-image-spec</Link>{" "}
          skill writes a spec a developer can implement in Vercel OG. The{" "}
          <Link href="/skills/figma-template-brief" className="font-medium underline-offset-4 hover:underline">figma-template-brief</Link>{" "}
          skill writes a spec for a Figma designer. Use these to drive image
          production at any scale.
        </AlertDescription>
      </Alert>
    </div>
  );
}
