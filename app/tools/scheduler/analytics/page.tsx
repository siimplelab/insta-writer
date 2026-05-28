import { db, schema } from "@/lib/db/client";
import { desc } from "drizzle-orm";
import { safeQuery } from "@/lib/db/safe";
import { getDict } from "@/lib/i18n/server";

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
    <main className="mx-auto max-w-4xl p-8 space-y-4">
      <h1 className="text-2xl font-bold">{t.analytics.title}</h1>
      {error && (
        <div className="rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          {t.dbError}
        </div>
      )}
      {!error && snaps.length === 0 ? (
        <p className="text-sm text-neutral-500">{t.analytics.empty}</p>
      ) : (
        snaps.length > 0 && (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-neutral-500">
                <th>{t.cols.day}</th>
                <th>{t.cols.reach}</th>
                <th>{t.cols.impressions}</th>
                <th>{t.cols.profileViews}</th>
                <th>{t.cols.followers}</th>
              </tr>
            </thead>
            <tbody>
              {snaps.map((s) => (
                <tr key={s.id} className="border-t">
                  <td>{s.day}</td>
                  <td>{s.reach ?? "—"}</td>
                  <td>{s.impressions ?? "—"}</td>
                  <td>{s.profileViews ?? "—"}</td>
                  <td>{s.followers ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
    </main>
  );
}
