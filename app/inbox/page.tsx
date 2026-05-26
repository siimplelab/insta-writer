import { db, schema } from "@/lib/db/client";
import { desc } from "drizzle-orm";
import { safeQuery } from "@/lib/db/safe";
import { getDict } from "@/lib/i18n/server";

export const dynamic = "force-dynamic";

export default async function InboxPage() {
  const t = await getDict();
  const { data: messages, error } = await safeQuery(
    () =>
      db
        .select()
        .from(schema.messagesLog)
        .orderBy(desc(schema.messagesLog.ts))
        .limit(100),
    [] as (typeof schema.messagesLog.$inferSelect)[],
  );

  return (
    <main className="mx-auto max-w-4xl p-8 space-y-4">
      <h1 className="text-2xl font-bold">{t.inbox.title}</h1>
      <p className="text-sm text-neutral-500">{t.inbox.hint}</p>
      {error && (
        <div className="rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          {t.dbError}
        </div>
      )}
      <ul className="space-y-2 text-sm">
        {messages.map((m) => (
          <li key={m.id} className="rounded border p-2">
            <div className="text-xs text-neutral-500">
              {m.ts.toISOString()} — {m.direction} — {m.igUserId}
            </div>
            <div>{m.body ?? <em className="text-neutral-400">{t.inbox.noText}</em>}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
