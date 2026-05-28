import Link from "next/link";
import { getDict } from "@/lib/i18n/server";

export const dynamic = "force-dynamic";

export default async function ToolsIndex() {
  const t = await getDict();
  const tools = [
    {
      href: "/tools/scheduler",
      title: t.scheduler.title,
      desc: t.scheduler.indexBlurb,
    },
    {
      href: "/tools/page-capture",
      title: t.pageCapture.title,
      desc: t.pageCapture.tagline,
    },
    {
      href: "/tools/visual-builder",
      title: "Visual Builder",
      desc: "Generate branded social images (OG / Instagram / Story) from templates. No design app required.",
    },
  ];

  return (
    <main className="mx-auto max-w-3xl p-8 space-y-6">
      <Link href="/" className="text-sm text-neutral-500 hover:underline">
        ← Home
      </Link>
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">{t.hub.tools}</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Working tools you can run today. Each one is local-first and uses
          official APIs of the platform it touches.
        </p>
      </header>
      <ul className="space-y-3">
        {tools.map((t) => (
          <li key={t.href}>
            <Link
              href={t.href}
              className="block rounded border p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900"
            >
              <h2 className="font-semibold">{t.title}</h2>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                {t.desc}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
