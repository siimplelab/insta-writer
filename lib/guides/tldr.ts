/**
 * Quick-read summaries for each guide. Rendered at the top of the detail page.
 * Keep each bullet short — under ~16 words. 3-5 bullets per guide.
 */
export const GUIDE_TLDR: Record<string, string[]> = {
  "promote-mobile-app": [
    "Five phases: pre-launch, launch day, first 30 days, 100→1,000 users, beyond.",
    "Pick a Tuesday for Product Hunt — coordinate everything to fire on that day.",
    "Month 1 is for listening (cold-DMs, calls, reviews), not for scaling.",
    "Don't buy ads before you have 100 manual users — you'll burn money learning what manual outreach teaches free.",
    "ASO + vertical video beat SEO blogs until you have 1,000 users.",
  ],
  "first-100-users": [
    "Manual outreach beats every paid channel at zero followers.",
    "Cold-DMs at ~10% conversion: 100 sent = ~3 keeps.",
    "Two niche communities + Hacker News Show HN + Indie Hackers + your network = enough.",
    "Skip ads and SEO blogs at this stage. They burn money or take too long.",
  ],
  "aso-basics": [
    "Title + subtitle do most of the work. Get the primary keyword in.",
    "First 3 screenshots are seen by ~70% of visitors. Lead with the outcome, not the UI.",
    "iOS keyword field is 100 chars total — every plural or repeat is wasted.",
    "ASO compounds. Iterate monthly, not yearly.",
  ],
  "ai-for-marketers": [
    "Use AI to do more, not to skip thinking. Mediocre AI = treadmill.",
    "AI wins at: synthesizing reviews, generating variations, first drafts, localization.",
    "AI loses at: your voice, real stories, replying to humans, images at scale (looks fake).",
    "Three workflow recipes: Monday content batch, Friday review digest, launch warmup.",
  ],
  "video-marketing": [
    "Vertical short-form video is the highest-leverage channel for a new app in 2026.",
    "Algorithm pushes Reels/TikTok/Shorts to non-followers — no audience required.",
    "AI stack: Sora 2 / Veo 3 / Runway for generation, HeyGen for avatars, ElevenLabs for voice, Submagic for captions.",
    "Three pipelines: demo Reel (10 min), AI avatar tutorial (15 min), generative B-roll (20 min).",
    "Strip TikTok watermarks before cross-posting to Reels.",
  ],
  "marketing-on-autopilot": [
    "Three setups: Claude Code scheduled tasks, Vercel Cron + AI SDK, or your own crontab.",
    "Three recipes: Monday content batch, Friday review digest, daily competitor signal.",
    "MCP lets Claude reach your scheduler API directly from any session.",
    "Default to draft, not queued. Never auto-publish without human eyes on it.",
  ],
  "design-automation": [
    "Four paths: Vercel OG (code), Figma (template), AI imagery, paid SaaS.",
    "Use Vercel OG (/tools/visual-builder) for social images. Use Figma for App Store screenshots.",
    "AI imagery for backgrounds + heroes — not anything with text or your UI.",
    "Skip paid SaaS unless you're producing 100+ images/week.",
    "Brand consistency = 1 typeface, 1 accent color, 1 illustration style. Stop changing them.",
  ],
  "switch-to-creator": [
    "Personal Instagram accounts have no API. Period. Buffer, Later, and this app all require Creator/Business.",
    "Switching takes 30 seconds in the IG app. Free. Invisible to followers. Reversible.",
    "Account type and tools → Switch to professional account → Creator.",
    "You lose the ability to set Private. You gain Insights + DM tabs + API access.",
  ],
  "content-strategy": [
    "70% educate or entertain. 20% community. 10% direct promotion.",
    "Saves + shares > likes. The algorithm rewards posts your followers send to a friend.",
    "Check your next 10 scheduled posts. If 6+ are promo, swap them.",
  ],
  "hashtags": [
    "Use 3-5, not 30. Specific (#sourdoughtoronto) beats broad (#bread).",
    "Caption or first comment doesn't matter (anymore). Put them wherever's cleanest.",
    "Avoid huge tags (>1M posts) for marketing — you drown in 5 min.",
    "On X, hashtags don't help reach. Skip them unless targeting a specific search.",
  ],
  "reels-strategy": [
    "First 3 seconds decide everything. Lead with the conclusion or surprise.",
    "Hook → value → CTA. 7-30 seconds total.",
    "Captions on-video (80%+ of viewers have sound off). Vertical 9:16, no watermarks.",
    "Record 4 Reels in one 30-min sitting on one topic. Schedule across 8 days.",
  ],
  "dm-funnels": [
    "Instagram's API limits DM auto-replies to within a 24-hour window after the user contacts you.",
    "This app deliberately doesn't build DM automation — requires always-on webhook hosting.",
    "Use ManyChat or Customers.ai if you want it. Best-in-class.",
    "Manual quick replies in the IG app are free and surprisingly effective.",
  ],
  "cadence-and-timing": [
    "Consistency beats 'best time' charts. 3 posts/week forever > 7 in week 1 + 0 after.",
    "Use your own Insights to find your audience's actual peak times.",
    "Engage in the first hour after posting. The algorithm reads first-hour engagement.",
    "On X: replies > posts. Aim for as many replies as original posts.",
  ],
  "twitter-marketing": [
    "X rewards engagement density. One thoughtful reply beats 20 of your own posts.",
    "Pick 20 niche accounts. Reply early (within 30 min of their post).",
    "70% single tweets / 20% threads / 10% images. Don't promote in replies.",
    "Bookmarks are X's strongest positive signal — stronger than likes.",
  ],
  analytics: [
    "Follower count is a vanity metric. Saves, shares, and bookmarks are real signal.",
    "Activation rate + day-7 retention predict long-term success more than reach.",
    "Track leads/week as your one-number dashboard. That's what ties to revenue.",
    "Reply to every comment that's > 4 words. Single emojis barely register.",
  ],
};

/**
 * Quick-read summaries for each skill — the 10-second pitch shown at top.
 */
export const SKILL_TLDR: Record<string, string> = {
  "icp-writer":
    "Run FIRST. Output is reused by every other copy skill. 80-word ICP paragraph + 5 attributes + 3 hangouts + a 7-word headline.",
  "app-store-copy":
    "Both iOS and Play Store listings, optimized for ASO. Title, subtitle, descriptions, keyword field.",
  "launch-tweet-thread":
    "Hook variants + 8-tweet thread + posting tips. 30 minutes from blank page to ready-to-post.",
  "ph-launch-kit":
    "Tagline, description, pinned maker comment, and pre-written FAQ replies. Everything you need to launch on Product Hunt.",
  "cold-outreach-email":
    "First-touch email + two follow-ups. Personalized openers, under 150 words, no Calendly link in email #1.",
  "video-script-writer":
    "Vertical-video script with hook variants, shot list, on-screen text, and target duration. Designed for solo founders.",
  "weekly-content-batch":
    "Runs every Monday on a cron. Outputs 7 days of social posts as JSON. Feed it straight into the scheduler's /api/v1/drafts.",
  "app-store-review-digest":
    "Friday cron. Synthesizes reviews into themes + action items + 5 quotable testimonials. Replaces hours of manual reading.",
  "figma-template-brief":
    "A precise spec a freelancer can quote in minutes and finish in one Figma session. App Store screenshots, ads, landing heroes.",
  "social-image-spec":
    "A spec concrete enough that a developer implements a Next.js `next/og` image template in 30 minutes.",
};
