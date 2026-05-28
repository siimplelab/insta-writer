import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays, ChartLine, PencilLine, Bird } from "lucide-react";
import { db, schema } from "@/lib/db/client";
import { desc } from "drizzle-orm";
import { safeQuery } from "@/lib/db/safe";
import { getDict } from "@/lib/i18n/server";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function SchedulerHome() {
  const t = await getDict();
  const accountsRes = await safeQuery(
    () => db.select().from(schema.igAccounts),
    [] as (typeof schema.igAccounts.$inferSelect)[],
  );
  const postsRes = await safeQuery(
    () =>
      db
        .select()
        .from(schema.posts)
        .orderBy(desc(schema.posts.scheduledFor))
        .limit(10),
    [] as (typeof schema.posts.$inferSelect)[],
  );
  const dbError = accountsRes.error ?? postsRes.error;
  const accounts = accountsRes.data;
  const upcoming = postsRes.data;

  const nav = [
    { href: "/tools/scheduler/compose", label: t.nav.compose, icon: PencilLine },
    { href: "/tools/scheduler/calendar", label: t.nav.calendar, icon: CalendarDays },
    { href: "/tools/scheduler/analytics", label: t.nav.analytics, icon: ChartLine },
    { href: "/tools/scheduler/twitter", label: "Twitter / X", icon: Bird },
  ];

  return (
    <div className="mx-auto max-w-4xl px-6 py-10 md:py-12 space-y-8">
      <Button variant="ghost" size="sm" className="-ml-3" asChild>
        <Link href="/tools"><ArrowLeft className="h-4 w-4" /> {t.toolsBackToIndex}</Link>
      </Button>

      <header className="space-y-3">
        <Badge variant="secondary">Tool · scheduler</Badge>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{t.scheduler.title}</h1>
        <p className="text-lg text-muted-foreground">{t.scheduler.tagline}</p>
      </header>

      {dbError && (
        <Alert variant="warning">
          <AlertTitle>Database issue</AlertTitle>
          <AlertDescription>{t.dbError}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t.connectedAccounts}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {accounts.length === 0 ? (
            <div className="space-y-3">
              <Button asChild>
                <Link href="/api/meta/oauth/start">
                  {t.connectButton}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Alert variant="info">
                <AlertTitle>Have a regular Instagram?</AlertTitle>
                <AlertDescription>
                  {t.onboardingHint}{" "}
                  <Link href="/guides/switch-to-creator" className="font-medium underline-offset-4 hover:underline">
                    {t.onboardingCta}
                  </Link>
                </AlertDescription>
              </Alert>
            </div>
          ) : (
            <ul className="space-y-2 text-sm">
              {accounts.map((a) => (
                <li key={a.id} className="flex items-center justify-between rounded-md border bg-muted/30 px-3 py-2">
                  <span className="font-medium">@{a.handle}</span>
                  <span className="text-xs text-muted-foreground">
                    {t.tokenExpires} {a.tokenExpiresAt.toISOString().slice(0, 10)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <nav className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {nav.map((n) => {
          const Icon = n.icon;
          return (
            <Link key={n.href} href={n.href} className="group">
              <Card className="h-full transition-all hover:border-foreground/20 hover:shadow-md">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md border bg-muted">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="font-medium">{n.label}</div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </nav>

      <section>
        <h2 className="mb-3 text-lg font-semibold">{t.recentPosts}</h2>
        {upcoming.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t.noPosts}</p>
        ) : (
          <Card>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead className="border-b">
                  <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="p-3">{t.cols.when}</th>
                    <th className="p-3">{t.cols.kind}</th>
                    <th className="p-3">{t.cols.status}</th>
                  </tr>
                </thead>
                <tbody>
                  {upcoming.map((p) => (
                    <tr key={p.id} className="border-b last:border-0">
                      <td className="p-3 font-mono text-xs">{p.scheduledFor.toISOString().slice(0, 16).replace("T", " ")}</td>
                      <td className="p-3"><Badge variant="outline">{p.kind}</Badge></td>
                      <td className="p-3">
                        <Badge variant={p.status === "posted" ? "success" : p.status === "failed" ? "destructive" : "secondary"}>
                          {p.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}
