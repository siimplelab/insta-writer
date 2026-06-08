# siimply marketing

**A minimal marketing toolkit for indie founders.** Just what works — AI skills you drop into Claude Code or Codex, focused guides, and one-tool-per-job working software.

Built as a Next.js 16 web hub AND a Claude Code workspace. Information lives in the web app (guides, skills, resources). AI skills + specialist subagents live in `.claude/` for direct use from any Claude Code session opened against this repo.

## What's inside

**Information (web hub):**
- `/start-here` — glossary (CAC, LTV, AARRR, ASO, PMF, ICP, NSM, MoM, churn, activation, CTR, MVP) + 5-step roadmap
- `/guides` — 14 opinionated guides incl. the flagship "promote a new mobile app" playbook, video marketing, marketing-on-autopilot, design automation
- `/skills` — 10 AI skills, downloadable as Markdown
- `/resources` — curated books / newsletters / communities / SaaS

**Working tools:**
- `/tools/scheduler` — IG + X multi-platform scheduler (official APIs, local-first)
- `/tools/visual-builder` — programmatic social-image generator (Next.js `next/og`)
- `/tools/image-generators` — curated catalog of widely-used AI image-gen services (Midjourney, ChatGPT, Gemini, Flux, Ideogram, Recraft, and more)
- `/tools/page-capture` — Chrome extension for capturing webpage content into draft posts

**Claude Code workspace:**
- `.claude/skills/<slug>/SKILL.md` — 10 marketing skills loaded into Claude Code automatically
- `.claude/agents/<name>.md` — 6 specialist marketing subagents (gtm-strategist, copywriter, aso-researcher, content-batcher, video-director, design-director)

## Stack

Next.js 16 (App Router) · Drizzle ORM · better-sqlite3 · Tailwind v4 + hand-rolled shadcn-style components · `next/og` for image generation. Local-first SQLite at `data/app.db`.

## Setup

```bash
npm install
npm run dev      # http://localhost:3000
```

SQLite auto-creates and auto-migrates on first run.

For the scheduler to actually post, see `.env.example` and connect a Meta and/or X developer app. For the AI features in skills, set `AI_GATEWAY_API_KEY`. For the Chrome extension, generate an `APP_API_KEY`.

## Use as a Claude Code workspace

Open this repo in Claude Code. The skills and subagents are auto-discovered:

```bash
# In a Claude Code session inside this repo:
/agents              # lists the 6 marketing subagents
# Talk to one:
"Hand off to gtm-strategist: I'm launching a fitness app for runners. What should I do first?"

# Or invoke a skill directly:
/skill icp-writer
```

## Use with Codex / other Anthropic SDK clients

The skills under `public/skills/*.md` are platform-agnostic Markdown with YAML frontmatter. Copy them into your client's prompt directory. The `.claude/skills/<slug>/SKILL.md` form is specific to Claude Code.

## What this project deliberately doesn't do

- Auto-DM / auto-comment / auto-follow on social platforms (violates ToS)
- Webhook-driven live event handling (would need always-on hosting; cut for simplicity)
- Personal IG account automation (Meta API requires Creator/Business — see `/guides/switch-to-creator`)
- Video tweet uploads (chunked upload pipeline, out of scope for MVP)

## Useful commands

```bash
npm run dev          # start Next.js
npm run build        # production build
npm run db:generate  # generate a new migration after schema edits
npm run db:studio    # Drizzle Studio against your local DB
```
