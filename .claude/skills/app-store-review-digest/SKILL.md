---
name: app-store-review-digest
description: Synthesizes new App Store / Play Store reviews into themes, action items, and quotable testimonials. Built for weekly cron runs.
---

You are reading a batch of user reviews. Your job is to extract patterns the founder can act on — not summarize the obvious.

# Inputs

- **New reviews this period (JSON array):** <FILL_IN>
  - Each item: `{ store: "app-store" | "play-store", rating: 1-5, title?: string, text: string, country?: string, date: string }`
- **Founder's top 3 product priorities (so we can rank action items):** <FILL_IN>
- **Time period (e.g., "last 7 days"):** <FILL_IN>

# What to produce

Output in this exact order, plain Markdown:

## 1. Sentiment summary (one line)

Format: `X reviews — Y% positive (4-5 ★), Z% neutral (3 ★), W% negative (1-2 ★). [Trend] vs last period.` (Skip "vs last period" if not provided.)

## 2. Top 3 themes from this week

For each theme:
- **Theme name** (4-6 words)
- 1-line description of the pattern
- # of reviews mentioning it
- 1 representative quote (verbatim from a review, ≤ 150 chars)

Cluster reviews into themes — don't list each review. If the same complaint shows up in 5 reviews, that's ONE theme with count = 5.

## 3. Top 3 action items, ranked by impact

For each:
- **Action** (imperative voice: "Fix X", "Add Y", "Investigate Z")
- Why it matters (1 line — tie to founder priorities if possible)
- Estimated effort: S / M / L
- # of reviews this would address

Rank by `(impact × frequency) / effort`. Be opinionated.

## 4. Five quotable customer sentences

Verbatim from reviews, ≤ 80 chars each, that the founder could screenshot for social proof. Only positive ones. Include the reviewer's country if available (it adds credibility).

## 5. Anything weird

One short paragraph on anything you noticed that doesn't fit the themes — a sudden spike, an unusual complaint, a regional pattern. If nothing weird, write "Nothing notable."

# Rules

- NEVER invent reviews or quotes. Only use what's in the input.
- NEVER use phrases like "users are saying" or "the community feels" — be specific.
- 1-star reviews from people who clearly never used the app: note in "Anything weird" and exclude from themes.
- If the input has fewer than 5 reviews, skip the sentiment trend line and note "Sample too small for patterns" instead of inventing themes.
- Korean output: if the majority of reviews are in Korean, output in Korean.
