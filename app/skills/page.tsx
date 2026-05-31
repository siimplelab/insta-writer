import Link from "next/link";
import { ArrowLeft, FileText, Clock4, Palette } from "lucide-react";
import { SKILLS } from "@/lib/skills/content";
import { skillTldr } from "@/lib/guides/tldr";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getDict, getLocale } from "@/lib/i18n/server";

export const dynamic = "force-dynamic";

const CATEGORY_ICON: Record<string, typeof FileText> = {
  copy: FileText,
  cron: Clock4,
  design: Palette,
};

export default async function SkillsIndex() {
  const t = await getDict();
  const locale = await getLocale();
  const p = t.pages.skillsIndex;
  const meta: Record<string, { label: string; desc: string }> = {
    copy: { label: p.catCopy, desc: p.catCopyDesc },
    cron: { label: p.catCron, desc: p.catCronDesc },
    design: { label: p.catDesign, desc: p.catDesignDesc },
  };

  const grouped: Record<string, typeof SKILLS> = {};
  for (const s of SKILLS) (grouped[s.category] ??= []).push(s);

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 md:py-12 space-y-10">
      <Button variant="ghost" size="sm" className="-ml-3" asChild>
        <Link href="/"><ArrowLeft className="h-4 w-4" /> {t.common.home}</Link>
      </Button>

      <header className="space-y-3">
        <Badge variant="secondary">{SKILLS.length} {p.badgeSuffix}</Badge>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{t.hub.skills}</h1>
        <p className="text-lg text-muted-foreground">{p.intro}</p>
      </header>

      {(["copy", "cron", "design"] as const).map((cat) => {
        const items = grouped[cat] ?? [];
        if (items.length === 0) return null;
        const Icon = CATEGORY_ICON[cat];
        return (
          <section key={cat} className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md border bg-muted">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{meta[cat].label}</h2>
                <p className="text-sm text-muted-foreground">{meta[cat].desc}</p>
              </div>
            </div>
            <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {items.map((s) => {
                const tldr = skillTldr(s.slug, locale);
                return (
                  <li key={s.slug}>
                    <Link href={`/skills/${s.slug}`} className="group block h-full">
                      <Card className="h-full transition-all hover:border-foreground/20 hover:shadow-md">
                        <CardHeader>
                          <CardTitle className="text-base font-mono">{s.slug}</CardTitle>
                          <CardDescription className="line-clamp-3">{s.blurb}</CardDescription>
                        </CardHeader>
                        {tldr && (
                          <CardContent>
                            <p className="line-clamp-2 text-xs italic text-muted-foreground">
                              {tldr}
                            </p>
                          </CardContent>
                        )}
                      </Card>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}

      <Link href="/guides/marketing-on-autopilot" className="block">
        <Alert variant="info" className="transition-colors hover:bg-accent">
          <AlertTitle>{p.calloutTitle}</AlertTitle>
          <AlertDescription>{p.calloutBody}</AlertDescription>
        </Alert>
      </Link>
    </div>
  );
}
