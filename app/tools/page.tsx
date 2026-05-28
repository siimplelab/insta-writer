import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarClock, Image as ImageIcon, Puzzle, Wand2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getDict } from "@/lib/i18n/server";

export const dynamic = "force-dynamic";

export default async function ToolsIndex() {
  const t = await getDict();

  const tools = [
    {
      href: "/tools/scheduler",
      title: t.scheduler.title,
      desc: t.scheduler.indexBlurb,
      icon: CalendarClock,
      badge: "Stateful",
    },
    {
      href: "/tools/visual-builder",
      title: "Visual Builder",
      desc: "Generate branded social images (OG / Instagram / Story) from templates. No design app required.",
      icon: ImageIcon,
      badge: "Stateless",
    },
    {
      href: "/tools/page-capture",
      title: t.pageCapture.title,
      desc: t.pageCapture.tagline,
      icon: Puzzle,
      badge: "Chrome extension",
    },
    {
      href: "/tools/image-generators",
      title: "AI image generators",
      desc: "Catalog of widely-used image-gen services (Midjourney, ChatGPT, Gemini, Flux, Ideogram, Recraft, and more) with honest one-line assessments.",
      icon: Wand2,
      badge: "Catalog",
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-6 py-10 md:py-12 space-y-8">
      <Button variant="ghost" size="sm" className="-ml-3" asChild>
        <Link href="/"><ArrowLeft className="h-4 w-4" /> Home</Link>
      </Button>

      <header className="space-y-3">
        <Badge variant="secondary">{tools.length} tools</Badge>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{t.hub.tools}</h1>
        <p className="text-lg text-muted-foreground">
          Working tools you can run today. Each one is local-first and uses official APIs of the platform it touches.
        </p>
      </header>

      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <li key={tool.href} className={tool.href === "/tools/scheduler" ? "md:col-span-2" : ""}>
              <Link href={tool.href} className="group block h-full">
                <Card className="h-full transition-all hover:border-foreground/20 hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-muted">
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge variant="outline" className="text-[10px]">{tool.badge}</Badge>
                    </div>
                    <CardTitle className="mt-3">{tool.title}</CardTitle>
                    <CardDescription>{tool.desc}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                    Open <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
                  </CardContent>
                </Card>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
