"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

const TEMPLATES = [
  { key: "social-share", label: "Social share (1200×630)", w: 1200, h: 630 },
  { key: "ig-square", label: "Instagram square (1080×1080)", w: 1080, h: 1080 },
  { key: "story-cover", label: "Story / Reels cover (1080×1920)", w: 1080, h: 1920 },
] as const;

type TemplateKey = (typeof TEMPLATES)[number]["key"];

export function VisualBuilder() {
  const [template, setTemplate] = useState<TemplateKey>("social-share");
  const [title, setTitle] = useState("Marketing Atlas");
  const [subtitle, setSubtitle] = useState(
    "A hub for indie founders launching new digital products.",
  );
  const [brand, setBrand] = useState("Marketing Atlas");
  const [accent, setAccent] = useState("#0ea5e9");
  const [bg, setBg] = useState("#0a0a0a");

  const tmpl = TEMPLATES.find((t) => t.key === template)!;

  const params = useMemo(() => {
    const p = new URLSearchParams();
    p.set("template", template);
    if (title) p.set("title", title);
    if (subtitle) p.set("subtitle", subtitle);
    if (brand) p.set("brand", brand);
    if (accent) p.set("accent", accent);
    if (bg) p.set("bg", bg);
    return p.toString();
  }, [template, title, subtitle, brand, accent, bg]);

  const previewUrl = `/api/og?${params}`;

  function copyUrl() {
    const full = window.location.origin + previewUrl;
    navigator.clipboard
      .writeText(full)
      .then(() => toast.success("URL copied"))
      .catch((e) => toast.error((e as Error).message));
  }

  // aspect ratio for preview frame
  const aspect = tmpl.w / tmpl.h;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.2fr]">
      {/* Form */}
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium">Template</span>
          <select
            className="mt-1 block w-full rounded border p-2"
            value={template}
            onChange={(e) => setTemplate(e.target.value as TemplateKey)}
          >
            {TEMPLATES.map((t) => (
              <option key={t.key} value={t.key}>
                {t.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium">Title</span>
          <input
            type="text"
            className="mt-1 block w-full rounded border p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={120}
          />
          <p className="mt-1 text-xs text-neutral-500">{title.length} / 120</p>
        </label>

        <label className="block">
          <span className="text-sm font-medium">Subtitle</span>
          <textarea
            className="mt-1 block w-full rounded border p-2"
            rows={2}
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            maxLength={200}
          />
          <p className="mt-1 text-xs text-neutral-500">{subtitle.length} / 200</p>
        </label>

        <label className="block">
          <span className="text-sm font-medium">Brand / handle</span>
          <input
            type="text"
            className="mt-1 block w-full rounded border p-2"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            maxLength={40}
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-sm font-medium">Accent color</span>
            <div className="mt-1 flex items-center gap-2">
              <input
                type="color"
                value={accent}
                onChange={(e) => setAccent(e.target.value)}
                className="h-10 w-12 rounded border"
              />
              <input
                type="text"
                value={accent}
                onChange={(e) => setAccent(e.target.value)}
                className="flex-1 rounded border p-2 font-mono text-xs"
              />
            </div>
          </label>
          <label className="block">
            <span className="text-sm font-medium">Background color</span>
            <div className="mt-1 flex items-center gap-2">
              <input
                type="color"
                value={bg}
                onChange={(e) => setBg(e.target.value)}
                className="h-10 w-12 rounded border"
              />
              <input
                type="text"
                value={bg}
                onChange={(e) => setBg(e.target.value)}
                className="flex-1 rounded border p-2 font-mono text-xs"
              />
            </div>
          </label>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <a
            href={previewUrl}
            download={`${template}.png`}
            className="rounded bg-black px-4 py-2 text-sm font-medium text-white"
          >
            Download PNG
          </a>
          <a
            href={previewUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded border px-4 py-2 text-sm font-medium"
          >
            Open in new tab
          </a>
          <button
            onClick={copyUrl}
            className="rounded border px-4 py-2 text-sm font-medium"
          >
            Copy URL
          </button>
        </div>

        <div className="rounded border border-neutral-200 bg-neutral-50 p-3 text-xs dark:border-neutral-800 dark:bg-neutral-900">
          <p className="font-medium">Programmatic use</p>
          <p className="mt-1 text-neutral-600 dark:text-neutral-400">
            This URL is the entire spec — embed it anywhere that takes an
            image URL. The image regenerates with the current params each load.
          </p>
          <pre className="mt-2 overflow-x-auto text-[10px]">{previewUrl}</pre>
        </div>
      </div>

      {/* Preview */}
      <div className="space-y-2">
        <div className="text-sm font-medium">
          Preview — {tmpl.w} × {tmpl.h}
        </div>
        <div
          className="rounded border border-neutral-200 dark:border-neutral-800"
          style={{
            aspectRatio: aspect,
            width: "100%",
            maxWidth: tmpl.key === "story-cover" ? 360 : "100%",
            background: "#000",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUrl}
            alt="preview"
            style={{ width: "100%", height: "100%", display: "block" }}
          />
        </div>
      </div>
    </div>
  );
}
