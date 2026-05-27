# Instagram Writer

**AI-assisted multi-platform scheduler with a browser-extension capture flow.**
Posts to your own Instagram (Creator / Business) and Twitter/X accounts via
official APIs. Local-first — your data and credentials live on your machine.

## What it does — and what it doesn't

This is intentionally a **publish-only** tool. It does **not** receive webhooks,
auto-DM, or auto-comment. That scope cut keeps the deployment story honest:
your laptop can be offline most of the day and the app will catch up when you
turn it on.

### ✅ What you get

- **Schedule** photo, carousel, reel, and story posts to IG
- **Schedule** tweets with images to X
- **AI caption** generation from an image (Vercel AI Gateway)
- **Browser extension** to capture page content into draft posts on any site
- **Calendar** view with status badges, delete for queued/draft/failed items
- **Catch-up + stale protection** — when your cron runs after being offline,
  it publishes anything queued within the last 24h and marks older items
  failed (so a Tuesday sale post doesn't go out on Thursday)
- **Marketing guides** built-in covering content strategy, hashtags, Reels,
  cadence, X, analytics
- **English + Korean** UI

### ❌ What you don't get (and why)

- **DM auto-replies / lead capture** — would require an always-on, publicly
  reachable webhook server. See `/guides/dm-funnels` for the honest landscape
  (ManyChat is the right tool).
- **Personal IG account support** — Meta's official API is hard-gated to
  Creator/Business accounts. Switch (free, invisible, reversible) — see
  `/guides/switch-to-creator`.
- **Comment automation / follower automation** — these violate Instagram's
  Terms of Use. We don't build them.
- **Twitter DM features** — Twitter's webhook tier (Account Activity API) is
  enterprise-priced.
- **Video tweets** — image-only for the MVP.

## Stack

Next.js 16 (App Router) · Drizzle ORM · better-sqlite3 · Vercel Blob · Vercel
AI Gateway · Tailwind.

Storage is local SQLite at `data/app.db`. The database and schema are created
and migrated automatically on first import.

## Setup

### 1. Install

```bash
npm install
```

### 2. Get a public URL (only for OAuth — not for live events)

The Meta and Twitter OAuth callbacks need a public HTTPS URL. Easiest options:

- **ngrok** free tier with a static domain ($8/mo, recommended)
- **Cloudflare Tunnel** free
- Or just use `http://localhost:3000` if your OAuth provider allows it (Twitter
  allows http://localhost; Meta requires https)

You only need this **while connecting accounts**. After that, you can run
purely on localhost.

### 3. Meta app

1. Create an app at https://developers.facebook.com
2. Add the **Instagram** product (skip Webhooks — we don't use them)
3. Connect your IG Creator/Business account to a Facebook Page you own
4. Add scopes: `instagram_basic`, `instagram_content_publish`,
   `instagram_manage_insights`, `pages_show_list`, `pages_read_engagement`
5. Set OAuth redirect URI to your public URL + `/api/meta/oauth/callback`
6. **Dev mode is fine** for using this on your own accounts — App Review is
   only needed if you want to share the app with other users (you don't)

### 4. Twitter / X app

1. https://developer.x.com → new project (Free tier, 1,500 posts/month)
2. User authentication settings: type **OAuth 2.0**, permissions **Read and
   write**, callback URL = `your-url/api/twitter/oauth/callback`

### 5. Configure env

Copy `.env.example` → `.env.local` and fill it in.

### 6. Run

```bash
npm run dev          # http://localhost:3000
```

### 7. Set up a local cron (if you actually want scheduling)

The publish cron is a regular HTTP endpoint. From your laptop's crontab:

```bash
* * * * * curl -fsS -H "Authorization: Bearer $CRON_SECRET" http://localhost:3000/api/cron/publish-due >/dev/null
```

If your laptop is closed, posts wait in the queue. When you open it, anything
scheduled within the last 24h publishes; older items are marked failed
(adjustable via `STALE_HOURS` in the cron handler).

## Chrome extension

See [extension/README.md](./extension/README.md). The extension captures the
current tab's images and text into draft posts via the v1 API.

## Useful commands

```bash
npm run dev          # start Next.js
npm run build        # production build
npm run db:generate  # after schema edits
npm run db:studio    # open Drizzle Studio against your local DB
```
