import Link from "next/link";
import { getDict } from "@/lib/i18n/server";

export const dynamic = "force-dynamic";

export default async function HubLanding() {
  const t = await getDict();

  const primary = [
    { href: "/start-here", label: t.hub.startHere, desc: t.hub.startHereDesc, accent: "bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-900" },
    { href: "/guides", label: t.hub.guides, desc: t.hub.guidesDesc, accent: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-900" },
    { href: "/skills", label: t.hub.skills, desc: t.hub.skillsDesc, accent: "bg-violet-50 dark:bg-violet-950 border-violet-200 dark:border-violet-900" },
  ];

  const secondary = [
    { href: "/tools", label: t.hub.tools, desc: t.hub.toolsDesc },
    { href: "/resources", label: t.hub.resources, desc: t.hub.resourcesDesc },
    { href: "/settings", label: t.hub.settings, desc: t.hub.settingsDesc },
  ];

  return (
    <main className="mx-auto max-w-5xl p-8 space-y-10">
      <header className="space-y-3 pt-8">
        <h1 className="text-4xl font-bold tracking-tight">{t.appTitle}</h1>
        <p className="max-w-2xl text-base text-neutral-600 dark:text-neutral-400">
          {t.appTagline}
        </p>
      </header>

      <section>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {primary.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className={`rounded-lg border p-5 transition-shadow hover:shadow-md ${p.accent}`}
            >
              <h2 className="text-lg font-semibold">{p.label}</h2>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                {p.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {secondary.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="rounded border border-neutral-200 p-4 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
            >
              <div className="font-medium">{s.label}</div>
              <div className="mt-0.5 text-xs text-neutral-500">{s.desc}</div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
