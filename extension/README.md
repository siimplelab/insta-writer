# miinimal — Chrome Extension

Companion extension for the miinimal app. Captures images and text from any
webpage into draft Instagram / X posts in the scheduler, with AI-generated
captions.

## What it does

- Reads the current tab's `og:image`, all images ≥200×200, and selected text
- Lets you pick which images to use
- Generates an Instagram caption via the app's AI (Anthropic Claude through
  Vercel AI Gateway) with the page context as input
- POSTs to `/api/v1/drafts` on your app, which downloads the images into
  Vercel Blob and creates a `draft` or `queued` post
- Right-click an image → "Save image to miinimal draft" for one-click capture

Auth is a single bearer API key (`APP_API_KEY`) you set on the server and
paste into the extension's Options page.

## Install (developer mode)

1. Open `chrome://extensions`
2. Top right → toggle **Developer mode** on
3. Click **Load unpacked** → pick this `extension/` directory
4. Click the extension icon → ⚙ (or right-click → Options)
5. Fill in:
   - **App URL** — e.g. `https://insta-writer.vercel.app`
   - **API key** — same value you set as `APP_API_KEY` in Vercel
   - **Default language** — for AI caption output
6. Click **Test connection** — should report the number of accounts available

## Setting the server-side API key

```bash
openssl rand -hex 32          # generate
```

Paste that into the Vercel dashboard → your project → **Settings → Environment
Variables** as `APP_API_KEY` (Production + Preview), then redeploy. Paste the
same value into the extension's Options page.

## Icons

This package ships without icon files. Add 16/32/48/128 px PNGs at
`extension/icons/icon-{size}.png` to remove the puzzle-piece placeholder Chrome
shows by default.

## Endpoints it uses

- `GET  /api/v1/accounts` — list connected IG accounts
- `POST /api/v1/caption`  — generate AI caption
- `POST /api/v1/drafts`   — create a draft post with media URL(s)

All require `Authorization: Bearer <APP_API_KEY>`.
