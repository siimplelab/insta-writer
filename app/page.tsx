import Link from "next/link";
import { ArrowRight, BookOpen, Compass, Sparkles, Wrench, Library, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getDict } from "@/lib/i18n/server";
import { GUIDES } from "@/lib/guides/content";

export const dynamic = "force-dynamic";

export default async function HubLanding() {
  const t = await getDict();
  const h = t.pages.home;

  const primary = [
    {
      href: "/start-here",
      label: t.hub.startHere,
      desc: t.hub.startHereDesc,
      icon: Compass,
      tag: h.beginnerTag,
    },
    {
      href: "/guides",
      label: t.hub.guides,
      desc: t.hub.guidesDesc,
      icon: BookOpen,
      tag: `${GUIDES.length} ${t.pages.guidesIndex.badgeSuffix}`,
    },
    {
      href: "/skills",
      label: t.hub.skills,
      desc: t.hub.skillsDesc,
      icon: Sparkles,
      tag: "Claude Code + Codex",
    },
  ];

  const secondary = [
    { href: "/tools", label: t.hub.tools, desc: t.hub.toolsDesc, icon: Wrench },
    { href: "/resources", label: t.hub.resources, desc: t.hub.resourcesDesc, icon: Library },
    { href: "/settings", label: t.hub.settings, desc: t.hub.settingsDesc, icon: Settings },
  ];

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
      <section className="max-w-3xl space-y-5">
        <Badge variant="secondary" className="w-fit">
          {h.badge}
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          {t.appTitle}
        </h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          {t.appTagline}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Button asChild>
            <Link href="/start-here">
              {h.ctaStart}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/guides/promote-mobile-app">{h.ctaPlaybook}</Link>
          </Button>
        </div>
      </section>

      <section className="mt-14">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {primary.map((p) => {
            const Icon = p.icon;
            return (
              <Link key={p.href} href={p.href} className="group">
                <Card className="h-full transition-all hover:border-foreground/20 hover:shadow-md">
                  <CardHeader className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-muted">
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge variant="outline" className="text-[10px]">
                        {p.tag}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{p.label}</CardTitle>
                    <CardDescription>{p.desc}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                    {t.common.open}
                    <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-6">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {secondary.map((s) => {
            const Icon = s.icon;
            return (
              <Link key={s.href} href={s.href} className="group">
                <Card className="flex h-full flex-row items-center gap-3 p-4 transition-all hover:border-foreground/20">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{s.label}</div>
                    <div className="text-xs text-muted-foreground">{s.desc}</div>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <Badge variant="info" className="w-fit">{h.flagshipBadge}</Badge>
            <CardTitle>{h.flagshipTitle}</CardTitle>
            <CardDescription>{h.flagshipDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="link" className="-ml-4" asChild>
              <Link href="/guides/promote-mobile-app">
                {h.flagshipCta}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Badge variant="success" className="w-fit">{h.toolBadge}</Badge>
            <CardTitle>{h.toolTitle}</CardTitle>
            <CardDescription>{h.toolDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="link" className="-ml-4" asChild>
              <Link href="/tools/visual-builder">
                {t.common.open}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
