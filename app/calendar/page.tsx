import { db, schema } from "@/lib/db/client";
import { asc } from "drizzle-orm";
import { safeQuery } from "@/lib/db/safe";
import { getDict } from "@/lib/i18n/server";

export const dynamic = "force-dynamic";

export default async function CalendarPage() {
  const t = await getDict();
  const { data: posts, error } = await safeQuery(
    () => db.select().from(schema.posts).orderBy(asc(schema.posts.scheduledFor)),
    [] as (typeof schema.posts.$inferSelect)[],
  );

  return (
    <main className="mx-auto max-w-4xl p-8 space-y-4">
      <h1 className="text-2xl font-bold">{t.calendar.title}</h1>
      {error && (
        <div className="rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          {t.dbError}
        </div>
      )}
      {!error && posts.length === 0 ? (
        <p className="text-sm text-neutral-500">{t.calendar.empty}</p>
      ) : (
        posts.length > 0 && (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-neutral-500">
                <th>{t.cols.when}</th>
                <th>{t.cols.kind}</th>
                <th>{t.cols.caption}</th>
                <th>{t.cols.status}</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id} className="border-t">
                  <td>{p.scheduledFor.toISOString().slice(0, 16).replace("T", " ")}</td>
                  <td>{p.kind}</td>
                  <td className="max-w-md truncate">{p.caption}</td>
                  <td>
                    {p.status}
                    {p.error ? ` — ${p.error}` : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
    </main>
  );
}
