import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getDict } from "@/lib/i18n/server";

export const dynamic = "force-dynamic";

type Item = { name: string; url?: string; why: string };
type Section = { title: string; items: Item[] };

const SECTIONS: Section[] = [
  {
    title: "Books",
    items: [
      { name: "Traction — Gabriel Weinberg & Justin Mares", url: "https://www.amazon.com/Traction-Startup-Achieve-Explosive-Customer/dp/1591848369", why: "19 channels to acquire users. The 'Bullseye Framework' alone is worth the price." },
      { name: "The Mom Test — Rob Fitzpatrick", url: "https://www.momtestbook.com/", why: "How to talk to potential users so they tell you the truth instead of being nice. Read before any customer interview." },
      { name: "Lean Analytics — Croll & Yoskovitz", url: "https://leananalyticsbook.com/", why: "Which metrics matter for your business model and stage. Saves you from drowning in vanity numbers." },
      { name: "Hooked — Nir Eyal", url: "https://www.nirandfar.com/hooked/", why: "The trigger / action / variable-reward / investment loop. Useful even if you're skeptical of habit-engineering ethics." },
      { name: "Marketing for Engineers (free online)", url: "https://marketingforengineers.com/", why: "Specifically pitched at builders who hate marketing. Plain language, no fluff." },
    ],
  },
  {
    title: "Newsletters",
    items: [
      { name: "Marketing Examples — Harry Dry", url: "https://marketingexamples.com/", why: "Bite-sized teardowns of marketing copy that worked. Best single source for intuitive copy sense." },
      { name: "Demand Curve Growth Newsletter", url: "https://www.demandcurve.com/newsletter", why: "Tactical, channel-by-channel. Strong on paid acquisition specifics." },
      { name: "Lenny's Newsletter", url: "https://www.lennysnewsletter.com/", why: "Product + growth for SaaS / mobile. Free tier is plenty." },
      { name: "Indie Hackers Weekly", url: "https://www.indiehackers.com/newsletters", why: "Real numbers from real solopreneurs. Grounding when comparing yourself to YC startups." },
    ],
  },
  {
    title: "Communities",
    items: [
      { name: "Indie Hackers", url: "https://www.indiehackers.com/", why: "Best place to launch and get honest feedback from people who've been there. Free." },
      { name: "r/SideProject", url: "https://www.reddit.com/r/SideProject/", why: "Saturday Showcase posts are a low-friction first launch venue." },
      { name: "Product Hunt Makers", url: "https://www.producthunt.com/makers", why: "Where you'll launch your big day. Lurk a few launches before yours." },
      { name: "MicroConf community", url: "https://microconf.com/", why: "Bootstrapped SaaS specifically. Conference is paid; community is approachable." },
    ],
  },
  {
    title: "Free-tier SaaS",
    items: [
      { name: "PostHog", url: "https://posthog.com/", why: "Self-hostable product analytics + feature flags + session replay. Open source." },
      { name: "Plausible", url: "https://plausible.io/", why: "Cookie-free, GDPR-friendly web analytics. OSS self-host available." },
      { name: "Tally", url: "https://tally.so/", why: "Free form builder. Use for waitlists, surveys, beta signups." },
      { name: "Beehiiv", url: "https://www.beehiiv.com/", why: "Newsletter platform with free tier up to 2,500 subscribers." },
      { name: "Senja", url: "https://senja.io/", why: "Collect and display testimonials. Free tier fine for the first 100 customers." },
      { name: "Resend", url: "https://resend.com/", why: "Transactional email API for developers. Free tier covers most early-stage volume." },
      { name: "Crisp", url: "https://crisp.chat/", why: "Live-chat widget with a useful free tier. Use for the first 50 user conversations." },
    ],
  },
  {
    title: "Mobile-app specific",
    items: [
      { name: "AppFollow", url: "https://appfollow.io/", why: "ASO + review monitoring. Free tier covers basic keyword tracking for one app." },
      { name: "data.ai (formerly App Annie)", url: "https://www.data.ai/", why: "Competitive intel on downloads and rankings. Free tier shows enough." },
      { name: "Sensor Tower", url: "https://sensortower.com/", why: "App-store intelligence. Paid, but the free Sensor Tower blog is excellent." },
      { name: "ASOMobile", url: "https://asomobile.net/", why: "Keyword research specifically for iOS and Android stores. Free tier is enough for one app." },
      { name: "RevenueCat", url: "https://www.revenuecat.com/", why: "Subscriptions / IAP SDK + analytics. Free up to $10K MTR." },
    ],
  },
  {
    title: "AI tools we reference",
    items: [
      { name: "Claude Code", url: "https://docs.anthropic.com/en/docs/claude-code/overview", why: "What our AI skills are built for. Scheduled tasks make 'marketing on autopilot' real." },
      { name: "OpenAI Codex CLI", url: "https://github.com/openai/codex", why: "Same idea as Claude Code, different model. Our skills work in both." },
      { name: "ElevenLabs", url: "https://elevenlabs.io/", why: "AI voiceovers. The 'Conversational' voices are indistinguishable for short reads." },
      { name: "HeyGen", url: "https://www.heygen.com/", why: "AI avatars for talking-head videos. Useful if you don't want to be on camera." },
      { name: "Submagic", url: "https://submagic.co/", why: "Auto-captions and edit polish for vertical video. Replaces hours of CapCut work." },
      { name: "Runway / Pika / Veo 3 / Sora 2", why: "Generative video. Use sparingly — recognizable as AI in 2026. Better for B-roll than full scenes." },
    ],
  },
];

export default async function Resources() {
  const t = await getDict();
  return (
    <div className="mx-auto max-w-5xl px-6 py-10 md:py-12 space-y-10">
      <Button variant="ghost" size="sm" className="-ml-3" asChild>
        <Link href="/"><ArrowLeft className="h-4 w-4" /> Home</Link>
      </Button>

      <header className="space-y-3">
        <Badge variant="secondary">Curated</Badge>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{t.hub.resources}</h1>
        <p className="text-lg text-muted-foreground">
          Hand-picked. Each entry has a one-line reason it&apos;s on this list. No affiliate links, no SEO filler.
        </p>
      </header>

      <Alert variant="info">
        <AlertTitle>TL;DR — if you only read 3 things</AlertTitle>
        <AlertDescription>
          <ol className="ml-1 mt-2 list-decimal space-y-1 pl-5">
            <li><span className="font-medium">Marketing Examples</span> (newsletter) — best copy intuition builder.</li>
            <li><span className="font-medium">The Mom Test</span> (book) — how to talk to users honestly.</li>
            <li><span className="font-medium">Indie Hackers</span> (community) — where to launch and get real numbers.</li>
          </ol>
        </AlertDescription>
      </Alert>

      {SECTIONS.map((s) => (
        <section key={s.title} className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight">{s.title}</h2>
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {s.items.map((item) => (
              <li key={item.name}>
                <Card className="h-full">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm">
                      {item.url ? (
                        <a href={item.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:underline">
                          {item.name}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : (
                        item.name
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">{item.why}</p>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
