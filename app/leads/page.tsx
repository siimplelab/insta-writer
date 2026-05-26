import { db, schema } from "@/lib/db/client";
import { desc } from "drizzle-orm";
import { safeQuery } from "@/lib/db/safe";
import { getDict } from "@/lib/i18n/server";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const t = await getDict();
  const { data: leads, error } = await safeQuery(
    () => db.select().from(schema.leads).orderBy(desc(schema.leads.firstSeen)),
    [] as (typeof schema.leads.$inferSelect)[],
  );

  const csvRows = [["ig_user_id", "username", "first_seen", "last_msg_at", "notes"]];
  for (const l of leads) {
    csvRows.push([
      l.igUserId,
      l.username ?? "",
      l.firstSeen.toISOString(),
      l.lastMsgAt?.toISOString() ?? "",
      (l.notes ?? "").replace(/[\r\n,]/g, " "),
    ]);
  }
  const csvData = csvRows.map((r) => r.join(",")).join("\n");

  return (
    <main className="mx-auto max-w-4xl p-8 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t.leads.title}</h1>
        <a
          href={`data:text/csv;charset=utf-8,${encodeURIComponent(csvData)}`}
          download="leads.csv"
          className="text-sm underline"
        >
          {t.leads.exportCsv}
        </a>
      </div>
      {error && (
        <div className="rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          {t.dbError}
        </div>
      )}
      {!error && leads.length === 0 ? (
        <p className="text-sm text-neutral-500">{t.leads.empty}</p>
      ) : (
        leads.length > 0 && (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-neutral-500">
                <th>{t.cols.igUser}</th>
                <th>{t.cols.firstSeen}</th>
                <th>{t.cols.lastMsg}</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id} className="border-t">
                  <td>{l.username ?? l.igUserId}</td>
                  <td>{l.firstSeen.toISOString().slice(0, 16)}</td>
                  <td>{l.lastMsgAt?.toISOString().slice(0, 16) ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
    </main>
  );
}
