import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, ListChecks } from "lucide-react";
import { GUIDES, getGuide } from "@/lib/guides/content";
import { guideTldr } from "@/lib/guides/tldr";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getDict, getLocale } from "@/lib/i18n/server";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

type Params = Promise<{ slug: string }>;

export default async function GuidePage({ params }: { params: Params }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const t = await getDict();
  const locale = await getLocale();
  const ko = locale === "ko";
  const p = t.pages.guideDetail;
  const tldr = guideTldr(slug, locale);
  // Whether the long-form body is shown in a language other than the UI locale
  const bodyIsEnglishOnly = ko;

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 md:py-12 space-y-8">
      <Button variant="ghost" size="sm" className="-ml-3" asChild>
        <Link href="/guides"><ArrowLeft className="h-4 w-4" /> {p.backAll}</Link>
      </Button>

      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{p.badge}</Badge>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" /> {guide.readingMinutes} {t.common.minRead}
          </span>
        </div>
        <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">
          {ko && guide.titleKo ? guide.titleKo : guide.title}
        </h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          {ko && guide.blurbKo ? guide.blurbKo : guide.blurb}
        </p>
      </header>

      {tldr && tldr.length > 0 && (
        <Alert variant="info">
          <ListChecks className="h-4 w-4" />
          <AlertTitle>{p.tldrTitle}</AlertTitle>
          <AlertDescription>
            <ul className="ml-1 mt-2 list-disc space-y-1 pl-5">
              {tldr.map((line, i) => <li key={i}>{line}</li>)}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <Separator />

      {bodyIsEnglishOnly && (
        <p className="text-xs italic text-muted-foreground">{p.bodyEnNote}</p>
      )}
      <article className="prose-base max-w-3xl">{guide.body()}</article>

      <Separator />

      <footer className="text-sm text-muted-foreground">
        <p>
          {p.footer.split(p.footerGuides)[0]}
          <Link href="/guides" className="font-medium text-foreground underline-offset-4 hover:underline">{p.footerGuides}</Link>
          {p.footer.split(p.footerGuides)[1]?.split(p.footerSkills)[0]}
          <Link href="/skills" className="font-medium text-foreground underline-offset-4 hover:underline">{p.footerSkills}</Link>
          {p.footer.split(p.footerSkills)[1]}
        </p>
      </footer>
    </div>
  );
}
