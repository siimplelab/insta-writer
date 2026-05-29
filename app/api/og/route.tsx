import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

type TemplateName = "social-share" | "ig-square" | "story-cover";

const SIZES: Record<TemplateName, { width: number; height: number }> = {
  "social-share": { width: 1200, height: 630 },
  "ig-square": { width: 1080, height: 1080 },
  "story-cover": { width: 1080, height: 1920 },
};

function isTemplate(v: string | null): v is TemplateName {
  return v === "social-share" || v === "ig-square" || v === "story-cover";
}

function clamp(s: string, max: number): string {
  return s.length > max ? s.slice(0, max - 1) + "…" : s;
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const template = url.searchParams.get("template");
  if (!isTemplate(template)) {
    return new Response("Unknown template", { status: 400 });
  }

  const size = SIZES[template];
  const title = clamp(url.searchParams.get("title") ?? "Title goes here", 120);
  const subtitle = clamp(url.searchParams.get("subtitle") ?? "", 200);
  const brand = clamp(url.searchParams.get("brand") ?? "siimply", 40);
  const accent = url.searchParams.get("accent") ?? "#0ea5e9";
  const bg = url.searchParams.get("bg") ?? "#0a0a0a";

  // Different layouts per template
  const isVertical = template === "story-cover";
  const isSquare = template === "ig-square";

  const titleSize = isVertical ? 96 : isSquare ? 92 : 84;
  const subtitleSize = isVertical ? 38 : 34;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: isVertical ? "96px" : "64px",
          background: `linear-gradient(135deg, ${bg} 0%, #18181b 100%)`,
          color: "#fafafa",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Top: brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 4,
              background: accent,
            }}
          />
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: -0.5,
              opacity: 0.85,
            }}
          >
            {brand}
          </div>
        </div>

        {/* Middle: title + subtitle */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: titleSize,
              fontWeight: 800,
              letterSpacing: -2.5,
              lineHeight: 1.05,
              maxWidth: isVertical ? "92%" : "85%",
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                fontSize: subtitleSize,
                fontWeight: 500,
                lineHeight: 1.35,
                opacity: 0.7,
                maxWidth: "78%",
              }}
            >
              {subtitle}
            </div>
          )}
        </div>

        {/* Bottom: accent bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              height: 6,
              width: isVertical ? 200 : 120,
              borderRadius: 999,
              background: accent,
            }}
          />
          <div
            style={{
              fontSize: 22,
              fontWeight: 500,
              opacity: 0.4,
            }}
          >
            {template}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
