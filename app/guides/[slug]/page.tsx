import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, ListChecks } from "lucide-react";
import { GUIDES, getGuide } from "@/lib/guides/content";
import { GUIDE_TLDR } from "@/lib/guides/tldr";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getLocale } from "@/lib/i18n/server";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

type Params = Promise<{ slug: string }>;

export default async function GuidePage({ params }: { params: Params }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const locale = await getLocale();
  const tldr = GUIDE_TLDR[slug];

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 md:py-12 space-y-8">
      <Button variant="ghost" size="sm" className="-ml-3" asChild>
        <Link href="/guides"><ArrowLeft className="h-4 w-4" /> {locale === "ko" ? "가이드 목록" : "All guides"}</Link>
      </Button>

      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">Guide</Badge>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" /> {guide.readingMinutes} min read
          </span>
        </div>
        <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">
          {locale === "ko" && guide.titleKo ? guide.titleKo : guide.title}
        </h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          {locale === "ko" && guide.blurbKo ? guide.blurbKo : guide.blurb}
        </p>
      </header>

      {tldr && tldr.length > 0 && (
        <Alert variant="info">
          <ListChecks className="h-4 w-4" />
          <AlertTitle>TL;DR — the 30-second version</AlertTitle>
          <AlertDescription>
            <ul className="ml-1 mt-2 list-disc space-y-1 pl-5">
              {tldr.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <Separator />

      <article className="prose-base max-w-3xl">{guide.body()}</article>

      <Separator />

      <footer className="text-sm text-muted-foreground">
        <p>
          Was this useful? Head back to{" "}
          <Link href="/guides" className="font-medium text-foreground underline-offset-4 hover:underline">all guides</Link>{" "}
          or try one of the{" "}
          <Link href="/skills" className="font-medium text-foreground underline-offset-4 hover:underline">AI skills</Link>{" "}
          to put it into practice.
        </p>
      </footer>
    </div>
  );
}
