import { db, schema } from "@/lib/db/client";
import { asc } from "drizzle-orm";
import { safeQuery } from "@/lib/db/safe";
import { getDict } from "@/lib/i18n/server";
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
    ...tweetsRes.data.map<Row>((t) => ({
      id: t.id,
      platform: "twitter",
      when: t.scheduledFor,
      kind: "tweet",
      caption: t.text,
      status: t.status,
      error: t.error,
      postedId: t.postedId,
    })),
  ].sort((a, b) => a.when.getTime() - b.when.getTime());

  // Group by day
  const groups = new Map<string, Row[]>();
  for (const r of rows) {
    const key = r.when.toISOString().slice(0, 10);
    const list = groups.get(key) ?? [];
    list.push(r);
    groups.set(key, list);
  }
  const dayKeys = Array.from(groups.keys()).sort();

  return (
    <main className="mx-auto max-w-4xl p-8 space-y-4">
      <h1 className="text-2xl font-bold">{t.calendar.title}</h1>
      {error && (
        <div className="rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          {t.dbError}
        </div>
      )}
      {!error && rows.length === 0 ? (
        <p className="text-sm text-neutral-500">{t.calendar.empty}</p>
      ) : (
        <div className="space-y-6">
          {dayKeys.map((day) => (
            <section key={day} className="space-y-2">
              <h2 className="text-xs font-medium uppercase tracking-wide text-neutral-500">
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
    </main>
  );
}
