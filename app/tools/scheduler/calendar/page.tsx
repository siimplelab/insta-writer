import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { db, schema } from "@/lib/db/client";
import { asc } from "drizzle-orm";
import { safeQuery } from "@/lib/db/safe";
import { getDict } from "@/lib/i18n/server";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarItem } from "./calendar-item";

export const dynamic = "force-dynamic";

type Row = {
  id: string;
  platform: "instagram" | "twitter";
  when: Date;
  kind: string;
  caption: string;
  status: string;
  error: string | null;
  postedId: string | null;
};

export default async function CalendarPage() {
  const t = await getDict();
  const postsRes = await safeQuery(
    () => db.select().from(schema.posts).orderBy(asc(schema.posts.scheduledFor)),
    [] as (typeof schema.posts.$inferSelect)[],
  );
  const tweetsRes = await safeQuery(
    () => db.select().from(schema.tweets).orderBy(asc(schema.tweets.scheduledFor)),
    [] as (typeof schema.tweets.$inferSelect)[],
  );

  const error = postsRes.error ?? tweetsRes.error;

  const rows: Row[] = [
    ...postsRes.data.map<Row>((p) => ({
      id: p.id,
      platform: "instagram",
      when: p.scheduledFor,
      kind: p.kind,
      caption: p.caption ?? "",
      status: p.status,
      error: p.error,
      postedId: p.igMediaId,
    })),
    ...tweetsRes.data.map<Row>((tw) => ({
      id: tw.id,
      platform: "twitter",
      when: tw.scheduledFor,
      kind: "tweet",
      caption: tw.text,
      status: tw.status,
      error: tw.error,
      postedId: tw.postedId,
    })),
  ].sort((a, b) => a.when.getTime() - b.when.getTime());

  const groups = new Map<string, Row[]>();
  for (const r of rows) {
    const key = r.when.toISOString().slice(0, 10);
    const list = groups.get(key) ?? [];
    list.push(r);
    groups.set(key, list);
  }
  const dayKeys = Array.from(groups.keys()).sort();

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 md:py-12 space-y-8">
      <Button variant="ghost" size="sm" className="-ml-3" asChild>
        <Link href="/tools/scheduler"><ArrowLeft className="h-4 w-4" /> Scheduler</Link>
      </Button>

      <header className="space-y-3">
        <Badge variant="secondary">{rows.length} items</Badge>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{t.calendar.title}</h1>
      </header>

      {error && (
        <Alert variant="warning">
          <AlertTitle>Database issue</AlertTitle>
          <AlertDescription>{t.dbError}</AlertDescription>
        </Alert>
      )}

      {!error && rows.length === 0 ? (
        <Alert>
          <AlertDescription>{t.calendar.empty}</AlertDescription>
        </Alert>
      ) : (
        <div className="space-y-6">
          {dayKeys.map((day) => (
            <section key={day} className="space-y-2">
              <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {day}
              </h2>
              <ul className="space-y-2">
                {groups.get(day)!.map((r) => (
                  <CalendarItem
                    key={`${r.platform}-${r.id}`}
                    row={r}
                    labels={{
                      delete: t.calendar.delete,
                      confirm: t.calendar.confirmDelete,
                      deleted: t.calendar.deleted,
                    }}
                  />
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
