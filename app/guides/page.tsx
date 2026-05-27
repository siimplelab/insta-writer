import Link from "next/link";
import { GUIDES } from "@/lib/guides/content";
import { getLocale } from "@/lib/i18n/server";

export const dynamic = "force-dynamic";

export default async function GuidesIndex() {
  const locale = await getLocale();
  return (
    <main className="mx-auto max-w-3xl p-8 space-y-6">
      <header className="space-y-2">
        <Link href="/" className="text-sm text-neutral-500 hover:underline">
          ← Home
        </Link>
        <h1 className="text-3xl font-bold">
          {locale === "ko" ? "SNS 마케팅 가이드" : "SNS Marketing Guides"}
        </h1>
        <p className="text-sm text-neutral-500">
          {locale === "ko"
            ? "이 앱을 효과적으로 사용하기 위한 실전 마케팅 가이드입니다. 일반론이 아닌 실제로 효과가 있는 방법만 정리했습니다."
            : "Practical guides for using this app effectively — what actually works on Instagram and Twitter in 2026, not generic checklists."}
        </p>
      </header>

      <ul className="space-y-3">
        {GUIDES.map((g) => (
          <li key={g.slug}>
            <Link
              href={`/guides/${g.slug}`}
              className="block rounded border p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900"
            >
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-semibold">
                  {locale === "ko" && g.titleKo ? g.titleKo : g.title}
                </h2>
                <span className="shrink-0 text-xs text-neutral-500">
                  {g.readingMinutes} min
                </span>
              </div>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                {locale === "ko" && g.blurbKo ? g.blurbKo : g.blurb}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
