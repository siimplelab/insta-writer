import Link from "next/link";
import { ArrowLeft, FileText, Clock4, Palette } from "lucide-react";
import { SKILLS } from "@/lib/skills/content";
import { SKILL_TLDR } from "@/lib/guides/tldr";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getDict } from "@/lib/i18n/server";

export const dynamic = "force-dynamic";

const CATEGORY_META: Record<string, { label: string; icon: typeof FileText; desc: string }> = {
  copy: { label: "Copy", icon: FileText, desc: "Run once when you need the output. Fill in the inputs, paste the result." },
  cron: { label: "Cron-friendly", icon: Clock4, desc: "Designed for a schedule (Claude Code scheduled tasks, Vercel Cron, or your own crontab). Structured output downstream tools can ingest." },
  design: { label: "Design briefs", icon: Palette, desc: "Generate precise specs for Figma templates or code-driven visual-builder images." },
};

export default async function SkillsIndex() {
  const t = await getDict();
  const grouped: Record<string, typeof SKILLS> = {};
  for (const s of SKILLS) (grouped[s.category] ??= []).push(s);

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 md:py-12 space-y-10">
      <Button variant="ghost" size="sm" className="-ml-3" asChild>
        <Link href="/"><ArrowLeft className="h-4 w-4" /> Home</Link>
      </Button>

      <header className="space-y-3">
        <Badge variant="secondary">{SKILLS.length} skills</Badge>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{t.hub.skills}</h1>
        <p className="text-lg text-muted-foreground">
          Drop-in prompts for Claude Code and Codex. Each one is a Markdown file
          with YAML frontmatter — install instructions on each detail page.
        </p>
      </header>

      {(["copy", "cron", "design"] as const).map((cat) => {
        const items = grouped[cat] ?? [];
        if (items.length === 0) return null;
        const meta = CATEGORY_META[cat];
        const Icon = meta.icon;
        return (
          <section key={cat} className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md border bg-muted">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{meta.label}</h2>
                <p className="text-sm text-muted-foreground">{meta.desc}</p>
              </div>
            </div>
            <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {items.map((s) => (
                <li key={s.slug}>
                  <Link href={`/skills/${s.slug}`} className="group block h-full">
                    <Card className="h-full transition-all hover:border-foreground/20 hover:shadow-md">
                      <CardHeader>
                        <CardTitle className="text-base font-mono">{s.slug}</CardTitle>
                        <CardDescription className="line-clamp-3">{s.blurb}</CardDescription>
                      </CardHeader>
                      {SKILL_TLDR[s.slug] && (
                        <CardContent>
                          <p className="line-clamp-2 text-xs italic text-muted-foreground">
                            {SKILL_TLDR[s.slug]}
                          </p>
                        </CardContent>
                      )}
                    </Card>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <Alert variant="info">
        <AlertTitle>New to Claude Code skills?</AlertTitle>
        <AlertDescription>
          See the{" "}
          <Link href="/guides/marketing-on-autopilot" className="font-medium underline-offset-4 hover:underline">
            Marketing on Autopilot guide
          </Link>{" "}
          — it explains how to install skills, schedule them with cron, and wire them into the scheduler.
        </AlertDescription>
      </Alert>
    </div>
  );
}
