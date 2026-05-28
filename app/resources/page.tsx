import Link from "next/link";
import { getDict } from "@/lib/i18n/server";

export const dynamic = "force-dynamic";

type Item = { name: string; url?: string; why: string };
type Section = { title: string; items: Item[] };

const SECTIONS: Section[] = [
  {
    title: "Books",
    items: [
      {
        name: "Traction — Gabriel Weinberg & Justin Mares",
        url: "https://www.amazon.com/Traction-Startup-Achieve-Explosive-Customer/dp/1591848369",
        why: "19 channels to acquire users. Read once early, then refer back constantly. The 'Bullseye Framework' alone is worth the price.",
      },
      {
        name: "The Mom Test — Rob Fitzpatrick",
        url: "https://www.momtestbook.com/",
        why: "How to talk to potential users so they tell you the truth instead of being nice. Read before any customer interview.",
      },
      {
        name: "Lean Analytics — Croll & Yoskovitz",
        url: "https://leananalyticsbook.com/",
        why: "Which metrics matter for your business model and stage. Saves you from drowning in vanity numbers.",
      },
      {
        name: "Hooked — Nir Eyal",
        url: "https://www.nirandfar.com/hooked/",
        why: "The trigger / action / variable-reward / investment loop. Useful even if you're skeptical of habit-engineering ethics.",
      },
      {
        name: "Marketing for Engineers — Karthik Hariharan (free online)",
        url: "https://marketingforengineers.com/",
        why: "Specifically pitched at builders who hate marketing. Plain language, no fluff.",
      },
    ],
  },
  {
    title: "Newsletters",
    items: [
      {
        name: "Marketing Examples — Harry Dry",
        url: "https://marketingexamples.com/",
        why: "Bite-sized teardowns of marketing copy that worked. The single best thing for getting an intuitive sense of good copy.",
      },
      {
        name: "Demand Curve Growth Newsletter",
        url: "https://www.demandcurve.com/newsletter",
        why: "Tactical, channel-by-channel. Strong on paid acquisition specifics.",
      },
      {
        name: "Lenny's Newsletter",
        url: "https://www.lennysnewsletter.com/",
        why: "Product + growth for SaaS / mobile. Long-form interviews with operators. Free tier is plenty.",
      },
      {
        name: "Indie Hackers Weekly",
        url: "https://www.indiehackers.com/newsletters",
        why: "Real numbers from real solopreneurs. Grounding when you're tempted to compare yourself to YC-funded startups.",
      },
    ],
  },
  {
    title: "Communities",
    items: [
      {
        name: "Indie Hackers",
        url: "https://www.indiehackers.com/",
        why: "Best place to launch and get honest feedback from people who've been there. Free.",
      },
      {
        name: "r/SideProject",
        url: "https://www.reddit.com/r/SideProject/",
        why: "Saturday Showcase posts are a low-friction first launch venue.",
      },
      {
        name: "Product Hunt Makers",
        url: "https://www.producthunt.com/makers",
        why: "Where you'll launch your big day. Lurk in the comments for a few launches before yours.",
      },
      {
        name: "MicroConf community",
        url: "https://microconf.com/",
        why: "Bootstrapped SaaS specifically. Conference is paid; community is approachable.",
      },
    ],
  },
  {
    title: "Free-tier SaaS we recommend",
    items: [
      {
        name: "PostHog",
        url: "https://posthog.com/",
        why: "Self-hostable product analytics + feature flags + session replay. Free tier is generous. Open source.",
      },
      {
        name: "Plausible",
        url: "https://plausible.io/",
        why: "Cookie-free, GDPR-friendly web analytics. ~$9/mo, lifetime if you self-host the OSS version.",
      },
      {
        name: "Tally",
        url: "https://tally.so/",
        why: "Free form builder. Use for waitlists, surveys, and beta signups.",
      },
      {
        name: "Beehiiv",
        url: "https://www.beehiiv.com/",
        why: "Newsletter platform with free tier up to 2,500 subscribers. Better referrals than ConvertKit/Mailchimp.",
      },
      {
        name: "Senja",
        url: "https://senja.io/",
        why: "Collect and display testimonials. Free tier is fine for the first 100 customers.",
      },
      {
        name: "Resend",
        url: "https://resend.com/",
        why: "Transactional email API for developers. Free tier covers most early-stage volume.",
      },
      {
        name: "Crisp",
        url: "https://crisp.chat/",
        why: "Live-chat widget with a useful free tier. Use it for the first 50 user conversations.",
      },
    ],
  },
  {
    title: "Mobile-app specific",
    items: [
      {
        name: "AppFollow",
        url: "https://appfollow.io/",
        why: "ASO + review monitoring. Free tier covers basic keyword tracking for one app.",
      },
      {
        name: "data.ai (formerly App Annie)",
        url: "https://www.data.ai/",
        why: "Competitive intel on downloads and rankings. Free tier shows enough to be useful.",
      },
      {
        name: "Sensor Tower",
        url: "https://sensortower.com/",
        why: "App-store intelligence. Paid, but the free Sensor Tower blog is excellent.",
      },
      {
        name: "ASOMobile",
        url: "https://asomobile.net/",
        why: "Keyword research specifically for iOS and Android stores. Free tier is enough for one app.",
      },
      {
        name: "RevenueCat",
        url: "https://www.revenuecat.com/",
        why: "Subscriptions / in-app purchases SDK + analytics. Free up to $10K MTR.",
      },
    ],
  },
  {
    title: "AI tools we reference in guides",
    items: [
      {
        name: "Claude Code",
        url: "https://docs.anthropic.com/en/docs/claude-code/overview",
        why: "What our AI skills are built for. Scheduled tasks make 'marketing on autopilot' real.",
      },
      {
        name: "OpenAI Codex CLI",
        url: "https://github.com/openai/codex",
        why: "Same idea as Claude Code, different model. Our skills work in both.",
      },
      {
        name: "ElevenLabs",
        url: "https://elevenlabs.io/",
        why: "AI voiceovers. Use the free tier to test. The 'Conversational' voices are now indistinguishable for short reads.",
      },
      {
        name: "HeyGen",
        url: "https://www.heygen.com/",
        why: "AI avatars for talking-head videos. Useful if you don't want to be on camera.",
      },
      {
        name: "Submagic",
        url: "https://submagic.co/",
        why: "Auto-captions and edit polish for vertical video. Replaces hours of CapCut work.",
      },
      {
        name: "Runway / Pika / Veo 3 / Sora 2",
        why: "Generative video. Use sparingly — looks AI'd in 2026. Better for B-roll cutaways than full scenes.",
      },
    ],
  },
];

export default async function Resources() {
  const t = await getDict();
  return (
    <main className="mx-auto max-w-3xl p-8 space-y-8">
      <Link href="/" className="text-sm text-neutral-500 hover:underline">
        ← Home
      </Link>
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">{t.hub.resources}</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Hand-picked. Each entry has a one-line reason it&apos;s on this list.
          No affiliate links, no SEO filler.
        </p>
      </header>

      {SECTIONS.map((s) => (
        <section key={s.title} className="space-y-3">
          <h2 className="text-xl font-semibold">{s.title}</h2>
          <ul className="space-y-2">
            {s.items.map((item) => (
              <li
                key={item.name}
                className="rounded border border-neutral-200 p-3 dark:border-neutral-800"
              >
                <div className="font-medium">
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline"
                    >
                      {item.name} ↗
                    </a>
                  ) : (
                    item.name
                  )}
                </div>
                <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  {item.why}
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
