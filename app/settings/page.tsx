import Link from "next/link";
import { ArrowLeft, Puzzle, Languages } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getDict, getLocale } from "@/lib/i18n/server";
import { SettingsForm } from "./settings-form";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const t = await getDict();
  const locale = await getLocale();
  const apiKeyConfigured = !!process.env.APP_API_KEY && process.env.APP_API_KEY.length >= 16;

  return (
    <div className="mx-auto max-w-2xl px-6 py-10 md:py-12 space-y-8">
      <Button variant="ghost" size="sm" className="-ml-3" asChild>
        <Link href="/"><ArrowLeft className="h-4 w-4" /> Home</Link>
      </Button>

      <header className="space-y-3">
        <Badge variant="secondary">Settings</Badge>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{t.settings.title}</h1>
      </header>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Languages className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-base">{t.settings.language}</CardTitle>
          </div>
          <CardDescription>Switch the UI language. Guide bodies stay in English; the rest is fully translated.</CardDescription>
        </CardHeader>
        <CardContent>
          <SettingsForm
            initialLocale={locale}
            labels={{
              language: t.settings.language,
              english: t.settings.english,
              korean: t.settings.korean,
              save: t.settings.save,
              saved: t.settings.saved,
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Puzzle className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-base">{t.settings.extensionTitle}</CardTitle>
          </div>
          <CardDescription>{t.settings.extensionDesc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {apiKeyConfigured ? (
            <Alert variant="success">
              <AlertTitle>✓ {t.settings.apiKeyConfigured}</AlertTitle>
            </Alert>
          ) : (
            <Alert variant="warning">
              <AlertTitle>API key missing</AlertTitle>
              <AlertDescription>{t.settings.apiKeyMissing}</AlertDescription>
            </Alert>
          )}
          <details className="text-sm">
            <summary className="cursor-pointer font-medium">{t.settings.extensionInstall}</summary>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-muted-foreground">
              <li>Clone the repo and open <code className="rounded bg-muted px-1">extension/</code></li>
              <li>Chrome → <code className="rounded bg-muted px-1">chrome://extensions</code></li>
              <li>Enable Developer Mode (top right)</li>
              <li>Click &quot;Load unpacked&quot; → pick the <code className="rounded bg-muted px-1">extension/</code> folder</li>
              <li>Open the extension Options page and paste your App URL + API key</li>
            </ol>
          </details>
        </CardContent>
      </Card>
    </div>
  );
}
