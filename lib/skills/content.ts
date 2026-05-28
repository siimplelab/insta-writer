export type Skill = {
  slug: string;
  title: string;
  blurb: string;
  category: "copy" | "cron" | "design";
  expectedInputs: string[];
  expectedOutputs: string[];
};

export const SKILLS: Skill[] = [
  // ---- one-shot copy skills ------------------------------------------
  {
    slug: "icp-writer",
    title: "icp-writer — Ideal Customer Profile synthesizer",
    blurb:
      "Turns a vague app description + 3 example users into a specific, usable ICP paragraph you can paste into every other skill.",
    category: "copy",
    expectedInputs: [
      "One-paragraph app description",
      "3 example users (name, job, why they'd use it)",
    ],
    expectedOutputs: [
      "1-paragraph ICP description",
      "5 demographic + psychographic attributes",
      "3 places this person hangs out online",
    ],
  },
  {
    slug: "app-store-copy",
    title: "app-store-copy — App Store + Play Store listing copy",
    blurb:
      "Generates ASO-aware title, subtitle, short + full descriptions, and a keyword list for both iOS and Android stores.",
    category: "copy",
    expectedInputs: [
      "App name",
      "1-sentence pitch",
      "Your ICP (from icp-writer)",
      "3 main features",
      "5 candidate keywords",
    ],
    expectedOutputs: [
      "iOS title (max 30 chars) + subtitle (max 30)",
      "Play short description (max 80) + full description (3-4 paragraphs)",
      "iOS keyword field (100 chars, comma-separated, no spaces)",
      "Hashtag + keyword strategy notes",
    ],
  },
  {
    slug: "launch-tweet-thread",
    title: "launch-tweet-thread — 8-tweet X launch thread",
    blurb:
      "Drafts a launch-day thread with hook, problem, solution, three feature beats, social proof, and CTA — all under 280 chars per tweet.",
    category: "copy",
    expectedInputs: [
      "App name + URL",
      "Your ICP",
      "Problem the app solves",
      "Top 3 features",
      "2 social-proof quotes from beta users (optional)",
    ],
    expectedOutputs: [
      "8 tweets ready to post",
      "Alt hooks for the first tweet (3 options)",
      "Suggested timing + thread engagement tips",
    ],
  },
  {
    slug: "ph-launch-kit",
    title: "ph-launch-kit — Product Hunt copy kit",
    blurb:
      "Generates the PH tagline, description, first maker comment, and FAQ-style replies to anticipated questions.",
    category: "copy",
    expectedInputs: [
      "App name + URL",
      "1-paragraph product description",
      "Your story (why you built it)",
      "Top 3 features",
    ],
    expectedOutputs: [
      "60-char tagline",
      "PH description (3-4 short paragraphs)",
      "Maker first-comment (the pinned reply)",
      "5 FAQ-style replies for common PH questions",
    ],
  },
  {
    slug: "cold-outreach-email",
    title: "cold-outreach-email — first-touch email",
    blurb:
      "Writes a personalized first-touch email to a potential user, influencer, or partner. Short, specific, asks for a small commitment.",
    category: "copy",
    expectedInputs: [
      "Recipient name + role + something specific you noticed about them",
      "Your app name + ICP fit",
      "What you're asking for (feedback / try beta / partnership)",
    ],
    expectedOutputs: [
      "Subject line (under 40 chars)",
      "Email body (under 150 words)",
      "2 follow-up variants if no reply in 5 days",
    ],
  },
  {
    slug: "video-script-writer",
    title: "video-script-writer — TikTok / Reels / Shorts script",
    blurb:
      "Generates a vertical-video script with hook variants, shot list, on-screen text cues, and target duration. Built for solo founders shooting on a phone.",
    category: "copy",
    expectedInputs: [
      "Video type (demo / before-after / tutorial / build-in-public)",
      "Feature or topic",
      "Your ICP",
      "Target duration (15 / 30 / 60 sec)",
    ],
    expectedOutputs: [
      "3 hook variants (first 3 seconds)",
      "Full script with timestamps",
      "Shot list (what to record, in order)",
      "On-screen text cues",
      "Suggested caption + hashtags",
    ],
  },

  // ---- cron-friendly skills ------------------------------------------
  {
    slug: "weekly-content-batch",
    title: "weekly-content-batch — 7 days of social posts (cron-friendly)",
    blurb:
      "Takes a brand brief + product updates + last week's top post and returns 7 draft posts as JSON. Designed to run on Monday morning and feed straight into the scheduler's /api/v1/drafts endpoint.",
    category: "cron",
    expectedInputs: [
      "1-paragraph brand brief",
      "Your ICP",
      "Last week's top-performing post (text + metric)",
      "2-3 new product updates / launches / news this week",
    ],
    expectedOutputs: [
      "JSON array of 7 posts",
      "Each post: { day, platform: 'instagram' | 'twitter', text, suggested_image_keywords }",
      "Posts vary in format (3 educational, 2 community, 1 personal, 1 promo)",
    ],
  },
  {
    slug: "app-store-review-digest",
    title: "app-store-review-digest — review summary (cron-friendly)",
    blurb:
      "Synthesizes new App Store + Play Store reviews into themes, action items, and quotable customer sentences. Run weekly on Friday.",
    category: "cron",
    expectedInputs: [
      "Array of new reviews (rating + text)",
      "Your top 3 product priorities (for prioritization)",
    ],
    expectedOutputs: [
      "Top 3 themes from this week",
      "Top 3 action items, ranked by impact",
      "5 quotable customer sentences (testimonials)",
      "Sentiment summary (positive / neutral / negative %)",
    ],
  },
];

// ---- Design briefs ----------------------------------------------------
SKILLS.push(
  {
    slug: "figma-template-brief",
    title: "figma-template-brief — Figma template specification",
    blurb:
      "Writes a precise spec for a Figma template that a freelancer (or you) can build in 1-2 hours. Used for App Store screenshots, ad sets, landing-page hero.",
    category: "design",
    expectedInputs: [
      "Asset type (screenshots / ads / hero / etc.)",
      "Brand: accent color, typeface, logo",
      "Your ICP",
      "Top 3 features to show",
      "2-3 reference designs you like",
      "Quantity needed in v1",
    ],
    expectedOutputs: [
      "Goal paragraph",
      "Specifications (canvas, palette, typography)",
      "Frame list with copy + screenshot direction per variant",
      "Component / variant strategy",
      "Acceptance criteria",
    ],
  },
  {
    slug: "social-image-spec",
    title: "social-image-spec — Vercel OG image template spec",
    blurb:
      "Writes a spec for a code-driven social image template (Next.js `next/og`). Output is concrete enough that a developer implements it in 30 minutes.",
    category: "design",
    expectedInputs: [
      "Image use case (OG / IG square / Story / blog header)",
      "Canvas size",
      "Brand colors, typeface",
      "Your ICP",
      "Variables to expose as URL search params",
    ],
    expectedOutputs: [
      "Layout description",
      "Typography table",
      "URL search-param contract",
      "React component sketch (pseudo-JSX)",
      "Acceptance criteria",
    ],
  },
);

export function getSkill(slug: string): Skill | undefined {
  return SKILLS.find((s) => s.slug === slug);
}
