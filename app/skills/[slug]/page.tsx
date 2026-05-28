import Link from "next/link";
import { notFound } from "next/navigation";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ArrowLeft, Code2, Sparkles } from "lucide-react";
import { SKILLS, getSkill } from "@/lib/skills/content";
import { SKILL_TLDR } from "@/lib/guides/tldr";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SkillBody } from "./skill-body";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return SKILLS.map((s) => ({ slug: s.slug }));
}

type Params = Promise<{ slug: string }>;

async function readSkillFile(slug: string): Promise<string | null> {
  try {
    const path = join(process.cwd(), "public", "skills", `${slug}.md`);
    return await readFile(path, "utf-8");
  } catch {
    return null;
  }
}

const CATEGORY_VARIANT: Record<string, "default" | "info" | "warning" | "success"> = {
  copy: "default",
  cron: "info",
  design: "success",
};

export default async function SkillDetail({ params }: { params: Params }) {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) notFound();
  const md = await readSkillFile(slug);
  const tldr = SKILL_TLDR[slug];
  const variant = CATEGORY_VARIANT[skill.category] ?? "default";

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 md:py-12 space-y-8">
      <Button variant="ghost" size="sm" className="-ml-3" asChild>
        <Link href="/skills"><ArrowLeft className="h-4 w-4" /> All skills</Link>
      </Button>

      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={variant === "default" ? "secondary" : variant}>
            {skill.category === "cron" ? "Cron-friendly" : skill.category === "design" ? "Design brief" : "One-shot"}
          </Badge>
          <Badge variant="outline" className="font-mono">{skill.slug}</Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{skill.title.split("—")[1]?.trim() ?? skill.title}</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">{skill.blurb}</p>
      </header>

      {tldr && (
        <Alert variant="info">
          <Sparkles className="h-4 w-4" />
          <AlertTitle>What it does, in 10 seconds</AlertTitle>
          <AlertDescription>{tldr}</AlertDescription>
        </Alert>
      )}

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Inputs you provide</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
              {skill.expectedInputs.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">What you get back</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
              {skill.expectedOutputs.map((o) => <li key={o}>{o}</li>)}
            </ul>
          </CardContent>
        </Card>
      </section>

      <Separator />

      <SkillBody slug={slug} markdown={md ?? ""} />

      <Alert>
        <Code2 className="h-4 w-4" />
        <AlertTitle>Install</AlertTitle>
        <AlertDescription className="space-y-2 text-sm">
          <p>
            <span className="font-semibold">Claude Code:</span> create{" "}
            <code className="rounded bg-muted px-1.5 py-0.5">~/.claude/skills/{skill.slug}/SKILL.md</code>{" "}
            and paste the file contents above. Restart Claude Code; run with{" "}
            <code className="rounded bg-muted px-1.5 py-0.5">/skill {skill.slug}</code>.
          </p>
          <p>
            <span className="font-semibold">Codex CLI:</span> drop into{" "}
            <code className="rounded bg-muted px-1.5 py-0.5">~/.codex/prompts/{skill.slug}.md</code>{" "}
            (path may vary by Codex version).
          </p>
        </AlertDescription>
      </Alert>
    </div>
  );
}
