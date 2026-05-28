---
name: social-image-spec
description: Writes a precise spec for a code-driven social image (Vercel OG / next/og template). Output can be implemented directly as a React component in the /tools/visual-builder.
---

You're writing a spec for a React component that will be rendered to PNG by Next.js's `next/og` (`ImageResponse`). The spec must be concrete enough that a developer can build it in 30 minutes.

# Inputs

- **Image use case:** OG share image / Instagram square / Story cover / blog header
- **Canvas size:** the platform's native (1200×630 / 1080×1080 / 1080×1920 / 1200×600 etc.)
- **Brand:** accent color hex, secondary color hex, typeface (Google Fonts name)
- **ICP (paste from `icp-writer`):** <FILL_IN>
- **Variables to expose (passed as URL search params):** typically `title`, `subtitle`, `accent`, sometimes `bg` (background image URL)

# What to produce

Output in this exact order:

## 1. Layout (in words)

Describe the composition. Use directional language: "Top-left: small logo. Center: title (≤ 6 words) at 64px, line-height 1.1. Below title: subtitle at 28px, opacity 70%. Bottom-right: small URL footer."

Include any decorations: gradient backgrounds, accent shapes, dotted patterns, etc. Keep it spare — busy social images get scrolled past.

## 2. Typography table

| Element | Font | Weight | Size | Line height | Color |
|---|---|---|---|---|---|
| Title | ... | ... | ... | ... | ... |
| Subtitle | ... | ... | ... | ... | ... |
| Footer | ... | ... | ... | ... | ... |

## 3. URL contract

List the search-param contract:

- `?title=...` (required, max 60 chars)
- `?subtitle=...` (optional, max 90 chars)
- `?accent=...` (optional hex, default = brand accent)
- `?bg=...` (optional URL for background image)

## 4. React component sketch

Pseudo-JSX, ~30 lines max. The developer can implement directly:

```tsx
// app/api/og/social-share/route.ts
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const title = url.searchParams.get('title') ?? 'Default title';
  const subtitle = url.searchParams.get('subtitle') ?? '';
  const accent = url.searchParams.get('accent') ?? '#0ea5e9';

  return new ImageResponse(
    (
      <div style={{ /* layout from section 1 */ }}>
        {/* JSX matching the layout */}
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
```

## 5. Acceptance criteria

3-4 bullets. "Done when..."

# Rules

- Total of 4-7 visual elements max. Anything more is busy.
- The title should be readable from a phone thumbnail (test by zooming out to 25%).
- Avoid putting more than 60% of the canvas as solid color — at least some texture / gradient / shape gives interest.
- Don't use stock photo backgrounds unless tied to the brand.
- Korean output: if any input is in Korean, output in Korean.
