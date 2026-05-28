import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { db, schema } from "@/lib/db/client";
import { desc } from "drizzle-orm";
import { safeQuery } from "@/lib/db/safe";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function TwitterHome() {
  const accountsRes = await safeQuery(
    () => db.select().from(schema.twAccounts),
    [] as (typeof schema.twAccounts.$inferSelect)[],
  );
  const tweetsRes = await safeQuery(
    () => db.select().from(schema.tweets).orderBy(desc(schema.tweets.scheduledFor)).limit(20),
    [] as (typeof schema.tweets.$inferSelect)[],
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 md:py-12 space-y-8">
      <Button variant="ghost" size="sm" className="-ml-3" asChild>
        <Link href="/tools/scheduler"><ArrowLeft className="h-4 w-4" /> Scheduler</Link>
      </Button>

      <header className="space-y-3">
        <Badge variant="secondary">Twitter · X</Badge>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Twitter / X</h1>
        <p className="text-lg text-muted-foreground">
          Schedule tweets to your own X account via the official Twitter API v2.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Connected accounts</CardTitle>
        </CardHeader>
        <CardContent>
          {accountsRes.data.length === 0 ? (
            <Button asChild>
              <Link href="/api/twitter/oauth/start">
                Connect Twitter / X
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <ul className="space-y-2 text-sm">
              {accountsRes.data.map((a) => (
                <li
                  key={a.id}
                  className="flex items-center justify-between rounded-md border bg-muted/30 px-3 py-2"
                >
                  <span className="font-medium">@{a.handle}</span>
                  <span className="text-xs text-muted-foreground">
                    expires {a.tokenExpiresAt.toISOString().slice(0, 16)}
                    {!a.refreshToken && " · no refresh"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Link href="/tools/scheduler/twitter/compose" className="group">
          <Card className="h-full transition-all hover:border-foreground/20">
            <CardContent className="p-4 font-medium">Compose tweet</CardContent>
          </Card>
        </Link>
        <Link href="/tools/scheduler" className="group">
          <Card className="h-full transition-all hover:border-foreground/20">
            <CardContent className="p-4 font-medium text-muted-foreground">← Back to IG</CardContent>
          </Card>
        </Link>
      </div>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Recent tweets</h2>
        {tweetsRes.data.length === 0 ? (
          <Alert>
            <AlertDescription>No tweets yet.</AlertDescription>
          </Alert>
        ) : (
          <ul className="space-y-2">
            {tweetsRes.data.map((t) => (
              <li key={t.id}>
                <Card>
                  <CardContent className="p-4">
                    <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-mono text-muted-foreground">
                        {t.scheduledFor.toISOString().slice(0, 16).replace("T", " ")}
                      </span>
                      <Badge
                        variant={
                          t.status === "posted"
                            ? "success"
                            : t.status === "failed"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {t.status}
                      </Badge>
                      {t.postedId && (
                        <span className="font-mono text-muted-foreground">
                          id {t.postedId.slice(0, 10)}…
                        </span>
                      )}
                      {t.error && <span className="text-destructive">{t.error}</span>}
                    </div>
                    <p className="whitespace-pre-wrap text-sm">{t.text}</p>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
