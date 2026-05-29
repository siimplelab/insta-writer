"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Copy, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TEMPLATES = [
  { key: "social-share", label: "Social share (1200×630)", w: 1200, h: 630 },
  { key: "ig-square", label: "Instagram square (1080×1080)", w: 1080, h: 1080 },
  { key: "story-cover", label: "Story / Reels cover (1080×1920)", w: 1080, h: 1920 },
] as const;

type TemplateKey = (typeof TEMPLATES)[number]["key"];

export function VisualBuilder() {
  const [template, setTemplate] = useState<TemplateKey>("social-share");
  const [title, setTitle] = useState("siimply");
  const [subtitle, setSubtitle] = useState("Minimal marketing for indie founders launching new digital products.");
  const [brand, setBrand] = useState("siimply");
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
  const aspect = tmpl.w / tmpl.h;

  function copyUrl() {
    const full = window.location.origin + previewUrl;
    navigator.clipboard
      .writeText(full)
      .then(() => toast.success("URL copied"))
      .catch((e) => toast.error((e as Error).message));
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.2fr]">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Inputs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="template">Template</Label>
            <select
              id="template"
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
              value={template}
              onChange={(e) => setTemplate(e.target.value as TemplateKey)}
            >
              {TEMPLATES.map((t) => <option key={t.key} value={t.key}>{t.label}</option>)}
            </select>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="title">Title</Label>
              <span className="text-xs text-muted-foreground">{title.length} / 120</span>
            </div>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={120} />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="subtitle">Subtitle</Label>
              <span className="text-xs text-muted-foreground">{subtitle.length} / 200</span>
            </div>
            <Textarea id="subtitle" rows={2} value={subtitle} onChange={(e) => setSubtitle(e.target.value)} maxLength={200} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="brand">Brand / handle</Label>
            <Input id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} maxLength={40} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Accent</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={accent}
                  onChange={(e) => setAccent(e.target.value)}
                  className="h-9 w-12 cursor-pointer rounded-md border"
                />
                <Input value={accent} onChange={(e) => setAccent(e.target.value)} className="font-mono text-xs" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Background</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={bg}
                  onChange={(e) => setBg(e.target.value)}
                  className="h-9 w-12 cursor-pointer rounded-md border"
                />
                <Input value={bg} onChange={(e) => setBg(e.target.value)} className="font-mono text-xs" />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <Button asChild>
              <a href={previewUrl} download={`${template}.png`}>
                <Download className="h-3.5 w-3.5" />
                Download PNG
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={previewUrl} target="_blank" rel="noreferrer">
                <ExternalLink className="h-3.5 w-3.5" />
                Open
              </a>
            </Button>
            <Button variant="outline" onClick={copyUrl}>
              <Copy className="h-3.5 w-3.5" />
              Copy URL
            </Button>
          </div>

          <div className="rounded-md border bg-muted/40 p-3 text-xs">
            <p className="font-medium">Programmatic use</p>
            <p className="mt-1 text-muted-foreground">
              This URL is the entire spec — embed it anywhere that takes an image URL.
            </p>
            <pre className="mt-2 overflow-x-auto text-[10px] text-muted-foreground">{previewUrl}</pre>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-base">Preview · {tmpl.w} × {tmpl.h}</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="overflow-hidden rounded-md border bg-black"
            style={{
              aspectRatio: aspect,
              width: "100%",
              maxWidth: tmpl.key === "story-cover" ? 360 : "100%",
              marginInline: tmpl.key === "story-cover" ? "auto" : undefined,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previewUrl} alt="preview" style={{ width: "100%", height: "100%", display: "block" }} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
