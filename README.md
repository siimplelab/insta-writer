# Instagram Writer

Personal marketing automation for your own Instagram Business/Creator accounts,
built on Meta's **official** APIs only — no browser automation, no
auto-follow/unfollow, no mass-comment-on-other-people's-posts (all of which
violate Instagram's ToS and get accounts banned).

## What it does

- **Schedule** photo, carousel, reel, and story posts
- **First comment** auto-posted right after publish (for hashtags)
- **AI caption** suggestions from your image (Vercel AI Gateway)
- **DM lead-gen**: keyword-triggered auto-replies to incoming DMs on your own
  accounts, captured into a leads table with CSV export
- **Analytics**: pull from the Insights API
- **Chrome extension** (`extension/`): one-click capture from any webpage into
  draft posts
- **i18n**: English + Korean

## Architecture

**Local-first.** Storage is **SQLite** in a local file (`data/app.db` by
default). There is no external database. The Vercel Function filesystem is
ephemeral so a Vercel deploy of this app won't persist data — **run it on
your own machine** with `npm run dev`.

Stack: Next.js 16 (App Router) · Drizzle ORM · better-sqlite3 · Vercel Blob
(optional, for media) · Vercel AI Gateway · Tailwind.

## Setup

### 1. Install dependencies

```bash
npm install
```

The SQLite database is created and migrated automatically on first
`npm run dev` / `npm run build`.

### 2. Meta app (one-time, manual)

1. Create an app at https://developers.facebook.com
2. Add **Instagram** and **Webhooks** products
3. Connect your IG Business/Creator account to a Facebook Page you own
4. Add scopes: `instagram_basic`, `instagram_content_publish`,
   `instagram_manage_comments`, `instagram_manage_messages`,
   `instagram_manage_insights`, `pages_show_list`, `pages_read_engagement`,
   `pages_manage_metadata`
5. Set the OAuth redirect URI to your public URL +
   `/api/meta/oauth/callback` (see ngrok step below)
6. In Webhooks, subscribe Instagram to `messages`, `comments`, `mentions`.
   Callback URL: public URL + `/api/webhooks/instagram`. Verify token: same
   value as `META_WEBHOOK_VERIFY_TOKEN`

### 3. Make your localhost reachable from Meta

Meta needs to call your machine for the OAuth redirect and webhook events.
Use ngrok (free) or any tunnel:

```bash
ngrok http 3000
```

Take the `https://*.ngrok.app` URL and put it in `META_REDIRECT_URI` and
`NEXT_PUBLIC_APP_URL`.

### 4. Configure env

Copy `.env.example` → `.env.local` and fill in:

```env
DB_PATH=data/app.db                  # default — leave as-is
META_APP_ID=...
META_APP_SECRET=...
META_WEBHOOK_VERIFY_TOKEN=...
META_REDIRECT_URI=https://your-tunnel.ngrok.app/api/meta/oauth/callback
NEXT_PUBLIC_APP_URL=https://your-tunnel.ngrok.app
CRON_SECRET=...                       # `openssl rand -hex 32`
APP_API_KEY=...                       # `openssl rand -hex 32`, for the Chrome ext
AI_GATEWAY_API_KEY=...                # optional, for AI caption
BLOB_READ_WRITE_TOKEN=...             # optional, only if using Vercel Blob for media
```

### 5. Run

```bash
npm run dev
```

Open http://localhost:3000 → click **Connect Instagram Business**.

### 6. Cron jobs

The scheduled-publish, refresh-token, and insight-pull jobs are HTTP endpoints
under `/api/cron/*`. Locally, hit them via system cron, a launchd plist, or
manually. Each requires `Authorization: Bearer $CRON_SECRET`.

Example macOS launchd entry to publish due posts every minute:

```bash
* * * * * curl -fsS -H "Authorization: Bearer $CRON_SECRET" http://localhost:3000/api/cron/publish-due
```

## Chrome extension

See [extension/README.md](./extension/README.md). After setting `APP_API_KEY`,
load the `extension/` folder in `chrome://extensions` (Developer Mode → Load
unpacked).

## Useful commands

```bash
npm run dev          # start Next.js
npm run build        # production build
npm run db:push      # apply schema changes without generating migration files
npm run db:generate  # generate a new migration after schema edits
npm run db:studio    # open Drizzle Studio against your local DB
```

## What's intentionally not built

- Following/unfollowing accounts programmatically
- Posting comments or DMs to accounts you don't own
- Liking other people's posts
- Anything that needs a private/reverse-engineered IG API

These are all against Instagram's Terms of Use and will get the account banned.
