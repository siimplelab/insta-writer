import Link from "next/link";
import { ArrowRight, ArrowLeft, Lightbulb } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

const GLOSSARY: { term: string; full: string; def: string }[] = [
  { term: "PMF", full: "Product-Market Fit", def: "The point where your product satisfies real demand. Practically: your users would be very disappointed if your product disappeared. Don't scale marketing before you have it." },
  { term: "MVP", full: "Minimum Viable Product", def: "The smallest version of your product that solves the core problem for one user. Ship it sooner than you think." },
  { term: "ICP", full: "Ideal Customer Profile", def: "A specific description of the user you'd most want. \"Indie iOS devs in the US, 25–40, ship side projects\" beats \"developers.\"" },
  { term: "GTM", full: "Go-To-Market", def: "Your launch and distribution plan. \"GTM strategy\" = how the right people will find and try your product." },
  { term: "AARRR", full: "Acquisition / Activation / Retention / Revenue / Referral", def: "Dave McClure's funnel. Diagnose where you're leaking users by measuring each stage." },
  { term: "NSM", full: "North-Star Metric", def: "The single number that best represents value delivered. Examples: weekly active conversations (Slack), nights booked (Airbnb)." },
  { term: "CAC", full: "Customer Acquisition Cost", def: "How much it costs (ads + content + tools) to get one paying customer. CAC < LTV is the basic survival math." },
  { term: "LTV", full: "Lifetime Value", def: "Total revenue from a customer before they churn. LTV / CAC > 3 is the rough healthy ratio for SaaS." },
  { term: "Churn", full: "Churn rate", def: "% of users who leave per period. 5% monthly = you replace your whole user base every ~20 months. Mobile churn is usually worse — measure it." },
  { term: "Activation", full: "Activation", def: "The user reaching the moment where they feel value for the first time. Define yours precisely — e.g., \"first photo edit completed.\"" },
  { term: "ASO", full: "App Store Optimization", def: "Optimizing your App Store / Play Store listing (keywords, screenshots, video, ratings) so people who search find you and tap install." },
  { term: "MoM", full: "Month-over-Month growth", def: "(This month − last month) / last month. 10–20% MoM compounds dramatically. <5% MoM and you're stalling." },
];

const STEPS = [
  { n: 1, title: "Read the launch playbook", body: "Open /guides/promote-mobile-app — 5 phases, ~20 minutes to read. It's the spine for everything that follows.", href: "/guides/promote-mobile-app", hrefLabel: "Open the playbook" },
  { n: 2, title: "Write your ICP and copy", body: "Use the AI Skills page. Run icp-writer first (so you know who you're talking to), then app-store-copy, ph-launch-kit, launch-tweet-thread, cold-outreach-email.", href: "/skills", hrefLabel: "Browse skills" },
  { n: 3, title: "Set up the scheduler", body: "Connect your IG (Creator/Business) and X accounts. Doesn't matter if you only post twice a week — consistency is the win.", href: "/tools/scheduler", hrefLabel: "Open scheduler" },
  { n: 4, title: "Launch", body: "Pick a date 2–4 weeks out. Use the playbook's launch-day checklist. Don't wait for \"perfect.\" Perfect kills more launches than bugs do.", href: "/guides/promote-mobile-app", hrefLabel: "Launch-day checklist" },
  { n: 5, title: "Measure and adjust", body: "Pick your North-Star Metric (see glossary). Track it weekly. Read /guides/analytics for what actually matters vs. vanity metrics.", href: "/guides/analytics", hrefLabel: "Read the analytics guide" },
];

export default async function StartHere() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10 md:py-12 space-y-10">
      <Button variant="ghost" size="sm" className="-ml-3" asChild>
        <Link href="/"><ArrowLeft className="h-4 w-4" /> Home</Link>
      </Button>

      <header className="space-y-3">
        <Badge variant="secondary">Orientation · 10 min</Badge>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Start here</h1>
        <p className="text-lg text-muted-foreground">
          You don&apos;t need to know marketing to ship a product that gets used.
          You need a vocabulary, a roadmap, and the discipline to send things.
          This page is the 10-minute version.
        </p>
      </header>

      <Alert variant="info">
        <Lightbulb className="h-4 w-4" />
        <AlertTitle>TL;DR</AlertTitle>
        <AlertDescription>
          <ul className="ml-1 mt-1 list-disc space-y-1 pl-5">
            <li>Learn the 12 terms below — you&apos;ll see them everywhere.</li>
            <li>Then walk the 5 steps in order. Each one feeds the next.</li>
            <li>You will get more from posting consistently for 6 weeks than from reading any one guide for 6 hours.</li>
          </ul>
        </AlertDescription>
      </Alert>

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Glossary — 12 terms to know</h2>
          <p className="mt-1 text-sm text-muted-foreground">Skim now, refer back later.</p>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {GLOSSARY.map((g) => (
            <Card key={g.term} className="border-border/60">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono">{g.term}</Badge>
                  <span className="text-xs text-muted-foreground">{g.full}</span>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 text-sm leading-relaxed">{g.def}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">5-step roadmap</h2>
          <p className="mt-1 text-sm text-muted-foreground">Do these in order. Don&apos;t skip — each one feeds the next.</p>
        </div>
        <ol className="space-y-3">
          {STEPS.map((s) => (
            <li key={s.n}>
              <Card>
                <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {s.n}
                  </div>
                  <div className="flex-1 space-y-1">
                    <CardTitle className="text-base">{s.title}</CardTitle>
                    <CardDescription>{s.body}</CardDescription>
                    <Button variant="link" className="-ml-4 mt-1 h-8" asChild>
                      <Link href={s.href}>
                        {s.hrefLabel}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            </li>
          ))}
        </ol>
      </section>

      <Alert variant="warning">
        <AlertTitle>One honest rule of thumb</AlertTitle>
        <AlertDescription>
          You will get more from posting consistently for 6 weeks than from
          reading any one guide for 6 hours. Skim, ship, measure, repeat.
        </AlertDescription>
      </Alert>
    </div>
  );
}
