import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div>
          <span className="font-medium text-foreground">miinimal</span>{" "}
          — minimal marketing for indie founders.
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/start-here" className="hover:text-foreground">
            Start here
          </Link>
          <Link href="/guides" className="hover:text-foreground">
            Guides
          </Link>
          <Link href="/skills" className="hover:text-foreground">
            Skills
          </Link>
          <Link href="/tools" className="hover:text-foreground">
            Tools
          </Link>
          <Link href="/resources" className="hover:text-foreground">
            Resources
          </Link>
          <a
            href="https://github.com/siimplelab/insta-writer"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
