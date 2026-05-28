import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { db, schema } from "@/lib/db/client";
import { desc } from "drizzle-orm";
import { safeQuery } from "@/lib/db/safe";
import { getDict } from "@/lib/i18n/server";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  const t = await getDict();
  const { data: snaps, error } = await safeQuery(
    () =>
      db
        .select()
        .from(schema.insightsSnapshots)
        .orderBy(desc(schema.insightsSnapshots.day))
        .limit(60),
    [] as (typeof schema.insightsSnapshots.$inferSelect)[],
  );
  return (
    <div className="mx-auto max-w-5xl px-6 py-10 md:py-12 space-y-8">
      <Button variant="ghost" size="sm" className="-ml-3" asChild>
        <Link href="/tools/scheduler"><ArrowLeft className="h-4 w-4" /> Scheduler</Link>
      </Button>

      <header className="space-y-3">
        <Badge variant="secondary">Analytics</Badge>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{t.analytics.title}</h1>
      </header>

      {error && (
        <Alert variant="warning">
          <AlertTitle>Database issue</AlertTitle>
          <AlertDescription>{t.dbError}</AlertDescription>
        </Alert>
      )}

      {!error && snaps.length === 0 ? (
        <Alert>
          <AlertDescription>{t.analytics.empty}</AlertDescription>
        </Alert>
      ) : (
        <Card>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="p-3">{t.cols.day}</th>
                  <th className="p-3">{t.cols.reach}</th>
                  <th className="p-3">{t.cols.impressions}</th>
                  <th className="p-3">{t.cols.profileViews}</th>
                  <th className="p-3">{t.cols.followers}</th>
                </tr>
              </thead>
              <tbody>
                {snaps.map((s) => (
                  <tr key={s.id} className="border-b last:border-0">
                    <td className="p-3 font-mono text-xs">{s.day}</td>
                    <td className="p-3">{s.reach ?? "—"}</td>
                    <td className="p-3">{s.impressions ?? "—"}</td>
                    <td className="p-3">{s.profileViews ?? "—"}</td>
                    <td className="p-3">{s.followers ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
