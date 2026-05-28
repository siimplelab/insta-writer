import Link from "next/link";

export const dynamic = "force-dynamic";

const GLOSSARY: { term: string; full: string; def: string }[] = [
  {
    term: "PMF",
    full: "Product-Market Fit",
    def: "The point where your product satisfies real demand. Practically: your users would be very disappointed if your product disappeared. Don't scale marketing before you have it.",
  },
  {
    term: "MVP",
    full: "Minimum Viable Product",
    def: "The smallest version of your product that solves the core problem for one user. Ship it sooner than you think.",
  },
  {
    term: "ICP",
    full: "Ideal Customer Profile",
    def: "A specific description of the user you'd most want. \"Indie iOS devs in the US, 25–40, ship side projects\" beats \"developers.\"",
  },
  {
    term: "GTM",
    full: "Go-To-Market",
    def: "Your launch and distribution plan. \"GTM strategy\" = how the right people will find and try your product.",
  },
  {
    term: "AARRR",
    full: "Acquisition / Activation / Retention / Revenue / Referral",
    def: "Dave McClure's funnel. Diagnose where you're leaking users by measuring each stage.",
  },
  {
    term: "NSM",
    full: "North-Star Metric",
    def: "The single number that best represents value delivered. Examples: weekly active conversations (Slack), nights booked (Airbnb).",
  },
  {
    term: "CAC",
    full: "Customer Acquisition Cost",
    def: "How much it costs (ads + content + tools) to get one paying customer. CAC < LTV is the basic survival math.",
  },
  {
    term: "LTV",
    full: "Lifetime Value",
    def: "Total revenue from a customer before they churn. LTV / CAC > 3 is the rough healthy ratio for SaaS.",
  },
  {
    term: "Churn",
    full: "Churn rate",
    def: "% of users who leave per period. 5% monthly = you replace your whole user base every ~20 months. Mobile churn is usually worse — measure it.",
  },
  {
    term: "Activation",
    full: "Activation",
    def: "The user reaching the moment where they feel value for the first time. Define yours precisely — e.g., \"first photo edit completed.\"",
  },
  {
    term: "ASO",
    full: "App Store Optimization",
    def: "Optimizing your App Store / Play Store listing (keywords, screenshots, video, ratings) so people who search find you and tap install.",
  },
  {
    term: "MoM",
    full: "Month-over-Month growth",
    def: "(This month − last month) / last month. 10–20% MoM compounds dramatically. <5% MoM and you're stalling.",
  },
];

const STEPS = [
  {
    n: 1,
    title: "Read the launch playbook",
    body: "Open /guides/promote-mobile-app — 5 phases, ~20 minutes to read. It's the spine for everything that follows.",
    href: "/guides/promote-mobile-app",
    hrefLabel: "Open the playbook →",
  },
  {
    n: 2,
    title: "Write your ICP and copy",
    body: "Use the AI Skills page. Run icp-writer first (so you know who you're talking to), then app-store-copy, ph-launch-kit, launch-tweet-thread, cold-outreach-email.",
    href: "/skills",
    hrefLabel: "Browse skills →",
  },
  {
    n: 3,
    title: "Set up the scheduler",
    body: "Connect your IG (Creator/Business) and X accounts. Doesn't matter if you only post twice a week — consistency is the win.",
    href: "/tools/scheduler",
    hrefLabel: "Open scheduler →",
  },
  {
    n: 4,
    title: "Launch",
    body: "Pick a date 2–4 weeks out. Use the playbook's launch-day checklist. Don't wait for \"perfect.\" Perfect kills more launches than bugs do.",
    href: "/guides/promote-mobile-app",
    hrefLabel: "Launch-day checklist →",
  },
  {
    n: 5,
    title: "Measure and adjust",
    body: "Pick your North-Star Metric (see glossary). Track it weekly. Read /guides/analytics for what actually matters vs. vanity metrics.",
    href: "/guides/analytics",
    hrefLabel: "Read the analytics guide →",
  },
];

export default async function StartHere() {
  return (
    <main className="mx-auto max-w-3xl p-8 space-y-10">
      <Link href="/" className="text-sm text-neutral-500 hover:underline">
        ← Home
      </Link>

      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Start here</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          You don&apos;t need to know marketing to ship a product that gets used.
          You need a vocabulary, a roadmap, and the discipline to send things.
          This page is the 10-minute version.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Glossary — 12 terms to know</h2>
        <p className="text-sm text-neutral-500">
          You&apos;ll see these everywhere. Skim now, refer back later.
        </p>
        <dl className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {GLOSSARY.map((g) => (
            <div
              key={g.term}
              className="rounded border border-neutral-200 p-3 dark:border-neutral-800"
            >
              <dt className="font-semibold">
                <span className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-xs dark:bg-neutral-800">
                  {g.term}
                </span>{" "}
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  {g.full}
                </span>
              </dt>
              <dd className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">
                {g.def}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">5-step roadmap</h2>
        <p className="text-sm text-neutral-500">
          Do these in order. Don&apos;t skip — each one feeds the next.
        </p>
        <ol className="space-y-3">
          {STEPS.map((s) => (
            <li
              key={s.n}
              className="rounded border border-neutral-200 p-4 dark:border-neutral-800"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-sm font-semibold text-white dark:bg-white dark:text-black">
                  {s.n}
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">
                    {s.body}
                  </p>
                  <Link
                    href={s.href}
                    className="inline-block text-sm font-medium text-blue-700 hover:underline dark:text-blue-300"
                  >
                    {s.hrefLabel}
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded border border-amber-200 bg-amber-50 p-4 text-sm dark:border-amber-900 dark:bg-amber-950">
        <p className="font-semibold text-amber-900 dark:text-amber-200">
          One honest rule of thumb
        </p>
        <p className="mt-1 text-amber-900 dark:text-amber-200">
          You will get more from posting consistently for 6 weeks than from
          reading any one guide for 6 hours. Skim, ship, measure, repeat.
        </p>
      </section>
    </main>
  );
}
