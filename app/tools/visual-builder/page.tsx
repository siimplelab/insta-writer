import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VisualBuilder } from "./builder";
import { getDict } from "@/lib/i18n/server";

export const dynamic = "force-dynamic";

export default async function VisualBuilderPage() {
  const t = await getDict();
  return (
    <div className="mx-auto max-w-6xl px-6 py-10 md:py-12 space-y-8">
      <Button variant="ghost" size="sm" className="-ml-3" asChild>
        <Link href="/tools"><ArrowLeft className="h-4 w-4" /> {t.toolsBackToIndex}</Link>
      </Button>

      <header className="space-y-3">
        <Badge variant="secondary">Tool · code-driven</Badge>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Visual Builder</h1>
        <p className="text-lg text-muted-foreground">
          Generate branded social images from templates — code-driven, no design app needed. Pick a template, fill the form, download the PNG.
        </p>
      </header>

      <Alert variant="info">
        <Sparkles className="h-4 w-4" />
        <AlertTitle>TL;DR</AlertTitle>
        <AlertDescription>
          Three preset sizes (1200×630, 1080×1080, 1080×1920). Edit title, subtitle, brand, accent. The generated URL is the entire spec — bookmark it or embed anywhere.{" "}
          <Link href="/guides/design-automation" className="font-medium underline-offset-4 hover:underline">When to use this vs Figma →</Link>
        </AlertDescription>
      </Alert>

      <VisualBuilder />
    </div>
  );
}
