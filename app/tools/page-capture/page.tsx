import Link from "next/link";
import { getDict } from "@/lib/i18n/server";

export const dynamic = "force-dynamic";

export default async function PageCapture() {
  const t = await getDict();
  return (
    <main className="mx-auto max-w-2xl p-8 space-y-6">
      <Link href="/tools" className="text-sm text-neutral-500 hover:underline">
        ← {t.toolsBackToIndex}
      </Link>
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">{t.pageCapture.title}</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {t.pageCapture.tagline}
        </p>
      </header>

      <section className="space-y-3 text-sm">
        <h2 className="font-semibold">What it does</h2>
        <ul className="list-disc space-y-1 pl-6 text-neutral-700 dark:text-neutral-300">
          <li>
            Reads the current tab&apos;s <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">og:image</code>,
            all images ≥ 200×200 px, and any selected text
          </li>
          <li>
            Lets you pick which image(s) to use, then generates a caption with
            AI using the page&apos;s title + URL + your selection as context
          </li>
          <li>
            POSTs to your local scheduler&apos;s{" "}
            <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">/api/v1/drafts</code>{" "}
            so the draft appears in the calendar for review
          </li>
        </ul>
      </section>

      <section className="space-y-3 text-sm">
        <h2 className="font-semibold">Install</h2>
        <ol className="list-decimal space-y-1 pl-6 text-neutral-700 dark:text-neutral-300">
          <li>
            Clone the repo and find the{" "}
            <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">extension/</code>{" "}
            folder
          </li>
          <li>
            Open{" "}
            <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">
              chrome://extensions
            </code>
          </li>
          <li>Enable Developer mode (top right)</li>
          <li>
            Click <strong>Load unpacked</strong> → pick the{" "}
            <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">extension/</code>{" "}
            folder
          </li>
          <li>
            Click the puzzle icon → Marketing Atlas → ⚙ → paste your App URL +
            API key
          </li>
          <li>
            Click <strong>Test connection</strong> — should report the number of
            connected accounts
          </li>
        </ol>
      </section>

      <section className="space-y-3 rounded border border-blue-200 bg-blue-50 p-4 text-sm dark:border-blue-900 dark:bg-blue-950">
        <h2 className="font-semibold text-blue-900 dark:text-blue-200">
          You&apos;ll need an API key
        </h2>
        <p className="text-blue-900 dark:text-blue-200">
          Generate one with{" "}
          <code className="rounded bg-white/40 px-1 dark:bg-black/30">
            openssl rand -hex 32
          </code>{" "}
          and put it in your{" "}
          <code className="rounded bg-white/40 px-1 dark:bg-black/30">
            .env.local
          </code>{" "}
          as{" "}
          <code className="rounded bg-white/40 px-1 dark:bg-black/30">
            APP_API_KEY
          </code>
          . Paste the same value into the extension options.
        </p>
      </section>
    </main>
  );
}
