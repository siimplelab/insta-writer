# Instagram Writer

Personal marketing automation for your own Instagram Business/Creator accounts.

Built on Meta's **official** APIs only — no browser automation, no
auto-follow/unfollow, no mass-comment-on-other-people's-posts (all of which
violate Instagram's ToS and get accounts banned).

## What it does

- **Schedule** photo, carousel, reel, and story posts
- **First comment** auto-posted right after publish (for hashtags)
- **AI caption** suggestions from your image (Vercel AI Gateway)
- **DM lead-gen**: keyword-triggered auto-replies to incoming DMs on your own
  accounts, captured into a leads table with CSV export
- **Analytics**: hourly pull from the Insights API

## Stack

Next.js 16 (App Router) · Postgres (Neon) · Drizzle · Vercel Blob ·
Vercel Cron · Vercel AI Gateway · shadcn-style Tailwind.

## Setup

### 1. Vercel + databases

```bash
vercel link
# In the dashboard, add the Neon Postgres + Blob integrations from the Marketplace.
vercel env pull .env.local
```

### 2. Meta app (one-time, manual)

1. Create an app at https://developers.facebook.com
2. Add **Instagram** and **Webhooks** products.
3. Connect your IG Business/Creator account to a Facebook Page you own.
4. Add these scopes to the app: `instagram_basic`, `instagram_content_publish`,
   `instagram_manage_comments`, `instagram_manage_messages`,
   `instagram_manage_insights`, `pages_show_list`, `pages_read_engagement`,
   `pages_manage_metadata`.
5. Set the OAuth redirect URI to
   `${NEXT_PUBLIC_APP_URL}/api/meta/oauth/callback`.
6. In the Webhooks product, subscribe the Instagram object to `messages`,
   `comments`, `mentions`. Callback URL:
   `${NEXT_PUBLIC_APP_URL}/api/webhooks/instagram`. Verify token: same value as
   `META_WEBHOOK_VERIFY_TOKEN` in your env.
7. In **dev mode**, the app works for your own connected accounts. App Review
   is only needed if you want to use it for other people's accounts (you don't,
   per the scope of this project).

Copy `.env.example` → `.env.local` and fill in `META_APP_ID`,
`META_APP_SECRET`, `META_WEBHOOK_VERIFY_TOKEN`, `META_REDIRECT_URI`,
`CRON_SECRET`, `NEXT_PUBLIC_APP_URL`, and `AI_GATEWAY_API_KEY` (from
Vercel AI Gateway).

### 3. Database migrations

```bash
npm run db:push
```

### 4. Dev

```bash
npm run dev
```

Visit http://localhost:3000 and click **Connect Instagram Business**.

For webhook + OAuth testing locally you need a public URL. Use a Vercel
preview deployment or a tunnel (`ngrok http 3000`) and set
`NEXT_PUBLIC_APP_URL` + `META_REDIRECT_URI` accordingly.

## Crons

Defined in `vercel.ts`:

- `* * * * *` → `/api/cron/publish-due` (publish queued posts)
- `0 3 * * *` → `/api/cron/refresh-tokens` (refresh long-lived tokens 14d ahead)
- `15 * * * *` → `/api/cron/pull-insights`

Cron handlers require an `x-cron-secret: $CRON_SECRET` header. Vercel injects
the secret automatically when crons are configured via `vercel.ts`.

## What's intentionally not built

- Following/unfollowing accounts programmatically
- Posting comments or DMs to accounts you don't own
- Liking other people's posts
- Anything that needs a private/reverse-engineered IG API

These are all against Instagram's Terms of Use and will get the account
banned. If you need broader "growth hacking," the honest answer is: pay for
ads, post good content, and engage manually.
