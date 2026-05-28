import Link from "next/link";
import { Clock, ArrowLeft } from "lucide-react";
import { GUIDES } from "@/lib/guides/content";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getLocale } from "@/lib/i18n/server";

export const dynamic = "force-dynamic";

export default async function GuidesIndex() {
  const locale = await getLocale();
  return (
    <div className="mx-auto max-w-4xl px-6 py-10 md:py-12 space-y-8">
      <Button variant="ghost" size="sm" className="-ml-3" asChild>
        <Link href="/"><ArrowLeft className="h-4 w-4" /> Home</Link>
      </Button>

      <header className="space-y-3">
        <Badge variant="secondary">{GUIDES.length} guides</Badge>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {locale === "ko" ? "SNS 마케팅 가이드" : "Marketing Guides"}
        </h1>
        <p className="text-lg text-muted-foreground">
          {locale === "ko"
            ? "실전 마케팅 가이드입니다. 일반론이 아닌 실제로 효과가 있는 방법만 정리했습니다."
            : "Practical guides for indie founders. What actually works in 2026 — not generic checklists."}
        </p>
      </header>

      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {GUIDES.map((g, i) => {
          const featured = i === 0;
          return (
            <li key={g.slug}>
              <Link href={`/guides/${g.slug}`} className="group block h-full">
                <Card className={`h-full transition-all hover:border-foreground/20 hover:shadow-md ${featured ? "border-foreground/30 bg-muted/40" : ""}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        {featured && <Badge variant="info">Flagship</Badge>}
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {g.readingMinutes} min
                        </span>
                      </div>
                    </div>
                    <CardTitle className="text-lg leading-snug">
                      {locale === "ko" && g.titleKo ? g.titleKo : g.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {locale === "ko" && g.blurbKo ? g.blurbKo : g.blurb}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
