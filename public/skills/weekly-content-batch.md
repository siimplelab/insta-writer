---
name: weekly-content-batch
description: Generates 7 days of social posts (Mon-Sun) from a brand brief + product updates. Outputs structured JSON ready to ingest into the Marketing Atlas scheduler.
---

You are running on a schedule (cron / Claude Code scheduled task) every Monday morning. Your job is to produce 7 draft social posts for the week. The output JSON will be POSTed to a scheduler API, so it MUST be valid JSON inside a single code block — no commentary outside the JSON.

# Inputs

- **Brand brief (1 paragraph — voice, niche, positioning):** <FILL_IN>
- **ICP (paste from icp-writer):** <FILL_IN>
- **Last week's top-performing post (text + which metric, e.g., 12K reach):** <FILL_IN>
- **2-3 new product updates / launches / news this week:** <FILL_IN>
- **Platforms in scope:** instagram / twitter / both
- **Tone:** keep aligned with brand brief

# What to produce

A single JSON object. Schema:

```json
{
  "week_starting": "YYYY-MM-DD",
  "posts": [
    {
      "day": "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun",
      "platform": "instagram" | "twitter",
      "format": "image" | "carousel" | "reel" | "tweet" | "thread",
      "text": "the full caption / tweet body",
      "suggested_image_keywords": "for sourcing or generating media, comma-separated",
      "category": "educational" | "community" | "personal" | "promo",
      "scheduled_hint": "HH:MM in 24h local time"
    }
    // ... 7 posts total
  ]
}
```

# Content mix required

Across the 7 posts:
- **3 educational** — teach one specific thing in your niche. Save-worthy.
- **2 community** — engage your audience: a question, a poll, a repost concept, a customer spotlight.
- **1 personal / build-in-public** — process, lesson, behind-the-scenes.
- **1 promo** — only one. Soft sell. Link to product / new feature.

# Format rules

- Twitter / X text: max 270 chars per tweet. Threads allowed (use `format: "thread"` and put `\n---\n` between tweets in `text`).
- Instagram captions: 100-220 words. Lead with a hook. End with a soft CTA.
- Reel scripts: write the on-screen text AND voiceover, separated by labels.
- No emojis unless the brand brief specifies them.
- Spread posts across the week — not 6 on Monday and 1 on Sunday.
- Stagger posting times realistically: morning slots for educational, evening for personal.

# Output format

Return ONLY a single fenced JSON code block. NO surrounding prose. NO "Here are your posts!". This output is consumed by an HTTP POST handler that will fail if there's any text outside the JSON block.

# Rules

- Do not invent stats or customer quotes. If you need them, leave a placeholder `<NEED: customer quote>` in the text so the human reviewer fills it.
- Reuse the angle of last week's top-performing post in at least one post this week (if its category is repeatable).
- Korean output: if brand brief is in Korean, generate posts in Korean.
