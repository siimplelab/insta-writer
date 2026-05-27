import Link from "next/link";
import { notFound } from "next/navigation";
import { GUIDES, getGuide } from "@/lib/guides/content";
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

  return (
    <main className="mx-auto max-w-2xl p-8 space-y-4">
      <Link href="/guides" className="text-sm text-neutral-500 hover:underline">
        ← {locale === "ko" ? "가이드 목록" : "All guides"}
      </Link>
      <header className="space-y-2 border-b pb-4">
        <h1 className="text-2xl font-bold leading-snug">
          {locale === "ko" && guide.titleKo ? guide.titleKo : guide.title}
        </h1>
        <p className="text-xs text-neutral-500">
          {guide.readingMinutes} min read
        </p>
      </header>
      <article className="prose-base">{guide.body()}</article>
    </main>
  );
}
