import Link from "next/link";
import { getDict } from "@/lib/i18n/server";

export async function SiteHeader() {
  const t = await getDict();

  const navLinks = [
    { href: "/start-here", label: t.hub.startHere },
    { href: "/guides", label: t.hub.guides },
    { href: "/skills", label: t.hub.skills },
    { href: "/tools", label: t.hub.tools },
    { href: "/resources", label: t.hub.resources },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span
            aria-hidden
            className="inline-block h-4 w-4 rounded-sm bg-gradient-to-br from-blue-500 to-violet-600"
          />
          <span>{t.appTitle}</span>
        </Link>
        <nav className="hidden flex-1 items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/settings"
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            {t.hub.settings}
          </Link>
        </div>
      </div>
    </header>
  );
}
