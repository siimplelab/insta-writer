<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version (16) has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# siimply — Claude Code workspace

This repository is a **minimal marketing toolkit for indie founders** built on Next.js 16. When you open it in Claude Code, you get:

- **6 specialist subagents** under `.claude/agents/` for marketing tasks:
  - `gtm-strategist` — go-to-market strategy
  - `copywriter` — orchestrates the copy skills
  - `aso-researcher` — App Store Optimization research
  - `content-batcher` — weekly content batching (cron-friendly)
  - `video-director` — TikTok / Reels script + production planning
  - `design-director` — design briefs (Figma / Vercel OG)

- **10 marketing skills** under `.claude/skills/<slug>/SKILL.md`:
  - Copy: `icp-writer`, `app-store-copy`, `launch-tweet-thread`, `ph-launch-kit`, `cold-outreach-email`, `video-script-writer`
  - Cron-friendly: `weekly-content-batch`, `app-store-review-digest`
  - Design briefs: `figma-template-brief`, `social-image-spec`

- **Public web hub** at `/` with reading-room versions of the same content (guides + skills + glossary + resources), plus working tools.

## Tools surfaced via the web UI

- `/tools/scheduler` — IG + X scheduler, local SQLite (this is the working tool from earlier iterations)
- `/tools/visual-builder` — code-driven social-image generator using `next/og`
- `/tools/image-generators` — curated catalog of widely-used AI image-gen services
- `/tools/page-capture` — Chrome extension for capturing webpage content into draft posts

## Project conventions

- Local-first: SQLite at `data/app.db`, auto-migrated on first import. No external DB.
- i18n: EN + KO via `lib/i18n/dict.ts` with cookie-based locale.
- Skills + agents are duplicated between `public/skills/` (web-downloadable) and `.claude/skills/` (Claude Code-loaded). Keep both in sync when editing.
- Schedulers use `safeQuery` (`lib/db/safe.ts`) for graceful DB error UX.

## When working in this repo

- Reach for the existing prose helpers in `lib/guides/content.tsx` (P, H2, UL, OL, Code, Quote, Em) for any new guide content.
- Skills are content, not code — write them as plain Markdown with YAML frontmatter. Match the existing tone.
- Don't bring back webhook / always-on features without re-discussing the architecture (we explicitly cut them in commit `d99bac7`).
- Don't add OG / video / social-platform automation features that violate Meta or X ToS. We refuse to build the spam path.
