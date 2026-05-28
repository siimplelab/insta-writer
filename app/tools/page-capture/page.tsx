import Link from "next/link";
import { ArrowLeft, Key } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDict } from "@/lib/i18n/server";

export const dynamic = "force-dynamic";

export default async function PageCapture() {
  const t = await getDict();
  return (
    <div className="mx-auto max-w-5xl px-6 py-10 md:py-12 space-y-8">
      <Button variant="ghost" size="sm" className="-ml-3" asChild>
        <Link href="/tools"><ArrowLeft className="h-4 w-4" /> {t.toolsBackToIndex}</Link>
      </Button>

      <header className="space-y-3">
        <Badge variant="secondary">Chrome extension</Badge>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{t.pageCapture.title}</h1>
        <p className="text-lg text-muted-foreground">{t.pageCapture.tagline}</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">What it does</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
            <li>Reads the current tab&apos;s <code className="rounded bg-muted px-1">og:image</code>, all images ≥ 200×200 px, and any selected text</li>
            <li>You pick which image(s) to use. AI generates a caption from the page context</li>
            <li>POSTs to your scheduler&apos;s <code className="rounded bg-muted px-1">/api/v1/drafts</code> so the draft appears in the calendar</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Install</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal space-y-1.5 pl-5 text-sm text-muted-foreground">
            <li>Clone the repo, find the <code className="rounded bg-muted px-1">extension/</code> folder</li>
            <li>Open <code className="rounded bg-muted px-1">chrome://extensions</code></li>
            <li>Enable Developer mode (top right)</li>
            <li>Click <strong>Load unpacked</strong> → pick the <code className="rounded bg-muted px-1">extension/</code> folder</li>
            <li>Click the puzzle icon → miinimal → ⚙ → paste your App URL + API key</li>
            <li>Click <strong>Test connection</strong> — should report the number of connected accounts</li>
          </ol>
        </CardContent>
      </Card>

      <Alert variant="info">
        <Key className="h-4 w-4" />
        <AlertTitle>You&apos;ll need an API key</AlertTitle>
        <AlertDescription>
          Generate one with <code className="rounded bg-muted px-1">openssl rand -hex 32</code> and put it in your{" "}
          <code className="rounded bg-muted px-1">.env.local</code> as{" "}
          <code className="rounded bg-muted px-1">APP_API_KEY</code>. Paste the same value into the extension options.
        </AlertDescription>
      </Alert>
    </div>
  );
}
