"use client";

import { useState } from "react";
import { toast } from "sonner";

export function SkillBody({
  slug,
  markdown,
}: {
  slug: string;
  markdown: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      toast.error((e as Error).message);
    }
  }

  if (!markdown) {
    return (
      <div className="rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200">
        Skill file <code>{slug}.md</code> is missing from{" "}
        <code>public/skills/</code>.
      </div>
    );
  }

  return (
    <section className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Skill file</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={copy}
            className="rounded border px-2 py-1 text-xs hover:bg-neutral-50 dark:hover:bg-neutral-900"
          >
            {copied ? "✓ Copied" : "Copy"}
          </button>
          <a
            href={`/skills/${slug}.md`}
            download={`${slug}.md`}
            className="rounded border px-2 py-1 text-xs hover:bg-neutral-50 dark:hover:bg-neutral-900"
          >
            Download .md
          </a>
        </div>
      </div>
      <pre className="overflow-x-auto rounded border bg-neutral-50 p-3 text-xs leading-relaxed dark:bg-neutral-900">
        {markdown}
      </pre>
    </section>
  );
}
