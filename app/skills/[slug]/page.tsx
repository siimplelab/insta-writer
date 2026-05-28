import Link from "next/link";
import { notFound } from "next/navigation";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SKILLS, getSkill } from "@/lib/skills/content";
import { SkillBody } from "./skill-body";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return SKILLS.map((s) => ({ slug: s.slug }));
}

type Params = Promise<{ slug: string }>;

async function readSkillFile(slug: string): Promise<string | null> {
  try {
    const path = join(process.cwd(), "public", "skills", `${slug}.md`);
    return await readFile(path, "utf-8");
  } catch {
    return null;
  }
}

export default async function SkillDetail({ params }: { params: Params }) {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) notFound();
  const md = await readSkillFile(slug);

  return (
    <main className="mx-auto max-w-3xl p-8 space-y-6">
      <Link href="/skills" className="text-sm text-neutral-500 hover:underline">
        ← All skills
      </Link>
      <header className="space-y-2 border-b pb-4">
        <span className="inline-block rounded bg-neutral-100 px-2 py-0.5 text-xs font-medium dark:bg-neutral-800">
          {skill.category === "cron" ? "Cron-friendly" : "One-shot"}
        </span>
        <h1 className="text-2xl font-bold leading-snug">{skill.title}</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">{skill.blurb}</p>
      </header>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded border p-3">
          <h2 className="text-sm font-semibold">Inputs</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-700 dark:text-neutral-300">
            {skill.expectedInputs.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
        <div className="rounded border p-3">
          <h2 className="text-sm font-semibold">Outputs</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-700 dark:text-neutral-300">
            {skill.expectedOutputs.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </div>
      </section>

      <SkillBody slug={slug} markdown={md ?? ""} />

      <section className="rounded border bg-neutral-50 p-4 text-sm dark:bg-neutral-900">
        <h2 className="font-semibold">Install</h2>
        <p className="mt-1 text-neutral-700 dark:text-neutral-300">
          <strong>Claude Code:</strong> create{" "}
          <code className="rounded bg-white px-1 dark:bg-black/30">
            ~/.claude/skills/{skill.slug}/SKILL.md
          </code>{" "}
          and paste the file contents above. Restart Claude Code; run with{" "}
          <code className="rounded bg-white px-1 dark:bg-black/30">
            /skill {skill.slug}
          </code>
          .
        </p>
        <p className="mt-2 text-neutral-700 dark:text-neutral-300">
          <strong>Codex CLI:</strong> drop into{" "}
          <code className="rounded bg-white px-1 dark:bg-black/30">
            ~/.codex/prompts/{skill.slug}.md
          </code>{" "}
          (path may vary by Codex version).
        </p>
      </section>
    </main>
  );
}
