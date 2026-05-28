import Link from "next/link";
import { VisualBuilder } from "./builder";
import { getDict } from "@/lib/i18n/server";

export const dynamic = "force-dynamic";

export default async function VisualBuilderPage() {
  const t = await getDict();
  return (
    <main className="mx-auto max-w-5xl p-8 space-y-6">
      <Link href="/tools" className="text-sm text-neutral-500 hover:underline">
        ← {t.toolsBackToIndex}
      </Link>
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Visual Builder</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Generate branded social images from templates — code-driven, no
          design app needed. Pick a template, fill the form, download the
          PNG. See{" "}
          <Link className="underline" href="/guides/design-automation">
            the design-automation guide
          </Link>{" "}
          for when to use this vs Figma.
        </p>
      </header>

      <VisualBuilder />
    </main>
  );
}
