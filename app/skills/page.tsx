import Link from "next/link";
import { SKILLS } from "@/lib/skills/content";
import { getDict } from "@/lib/i18n/server";

export const dynamic = "force-dynamic";

export default async function SkillsIndex() {
  const t = await getDict();
  const copy = SKILLS.filter((s) => s.category === "copy");
  const cron = SKILLS.filter((s) => s.category === "cron");
  const design = SKILLS.filter((s) => s.category === "design");

  return (
    <main className="mx-auto max-w-3xl p-8 space-y-8">
      <Link href="/" className="text-sm text-neutral-500 hover:underline">
        ← Home
      </Link>

      <header className="space-y-2">
        <h1 className="text-3xl font-bold">{t.hub.skills}</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Drop-in prompts for Claude Code and Codex. Each one is a Markdown
          file with YAML frontmatter — install instructions on each detail
          page.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Copy / one-shot skills</h2>
        <p className="text-sm text-neutral-500">
          Run once when you need the output. Fill in the inputs, paste the
          result.
        </p>
        <ul className="space-y-2">
          {copy.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/skills/${s.slug}`}
                className="block rounded border p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900"
              >
                <h3 className="font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  {s.blurb}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Cron-friendly skills</h2>
        <p className="text-sm text-neutral-500">
          Designed to run on a schedule (Claude Code scheduled tasks, Vercel
          Cron, or your own crontab). Output is structured so downstream
          tools can ingest it.
        </p>
        <ul className="space-y-2">
          {cron.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/skills/${s.slug}`}
                className="block rounded border p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900"
              >
                <h3 className="font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  {s.blurb}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Design briefs</h2>
        <p className="text-sm text-neutral-500">
          Generate precise specs for Figma templates or code-driven{" "}
          <Link className="underline" href="/tools/visual-builder">visual-builder</Link>{" "}
          images. Hands off the &quot;what should this look like&quot;
          question to a focused brief instead of vibes.
        </p>
        <ul className="space-y-2">
          {design.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/skills/${s.slug}`}
                className="block rounded border p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900"
              >
                <h3 className="font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  {s.blurb}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded border border-blue-200 bg-blue-50 p-4 text-sm dark:border-blue-900 dark:bg-blue-950">
        <h3 className="font-semibold text-blue-900 dark:text-blue-200">
          New to Claude Code skills?
        </h3>
        <p className="mt-1 text-blue-900 dark:text-blue-200">
          See the{" "}
          <Link
            className="underline"
            href="/guides/marketing-on-autopilot"
          >
            Marketing on Autopilot guide
          </Link>{" "}
          — it explains how to install skills, schedule them with cron, and
          wire them into the scheduler.
        </p>
      </section>
    </main>
  );
}
