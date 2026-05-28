import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { db, schema } from "@/lib/db/client";
import { Composer } from "./composer";
import { safeQuery } from "@/lib/db/safe";
import { getDict } from "@/lib/i18n/server";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function ComposePage() {
  const t = await getDict();
  const { data: accounts, error } = await safeQuery(
    () =>
      db
        .select({ id: schema.igAccounts.id, handle: schema.igAccounts.handle })
        .from(schema.igAccounts),
    [] as { id: string; handle: string }[],
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 md:py-12 space-y-8">
      <Button variant="ghost" size="sm" className="-ml-3" asChild>
        <Link href="/tools/scheduler"><ArrowLeft className="h-4 w-4" /> Scheduler</Link>
      </Button>

      <header className="space-y-3">
        <Badge variant="secondary">Compose · Instagram</Badge>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{t.compose.title}</h1>
      </header>

      {error && (
        <Alert variant="warning">
          <AlertTitle>Database issue</AlertTitle>
          <AlertDescription>{t.dbError}</AlertDescription>
        </Alert>
      )}

      {!error && accounts.length === 0 ? (
        <Alert variant="info">
          <AlertTitle>Connect an account first</AlertTitle>
          <AlertDescription className="space-y-2">
            <p>{t.compose.connectFirst}</p>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/tools/scheduler">← Go to scheduler</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/guides/switch-to-creator">{t.onboardingCta}</Link>
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      ) : (
        accounts.length > 0 && (
          <Composer
            accounts={accounts}
            labels={{
              account: t.compose.account,
              kind: t.compose.kind,
              photo: t.compose.photo,
              carousel: t.compose.carousel,
              reel: t.compose.reel,
              story: t.compose.story,
              media: t.compose.media,
              caption: t.compose.caption,
              aiSuggest: t.compose.aiSuggest,
              firstComment: t.compose.firstComment,
              scheduledFor: t.compose.scheduledFor,
              schedule: t.compose.schedule,
              scheduled: t.compose.scheduled,
              uploadFirst: t.compose.uploadFirst,
              uploadAtLeastOne: t.compose.uploadAtLeastOne,
              noCaptionReturned: t.compose.noCaptionReturned,
            }}
          />
        )
      )}
    </div>
  );
}
