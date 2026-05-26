import { db, schema } from "@/lib/db/client";
import { RulesEditor } from "./rules-editor";
import { safeQuery } from "@/lib/db/safe";
import { getDict } from "@/lib/i18n/server";

export const dynamic = "force-dynamic";

export default async function RulesPage() {
  const t = await getDict();
  const accountsRes = await safeQuery(
    () =>
      db
        .select({ id: schema.igAccounts.id, handle: schema.igAccounts.handle })
        .from(schema.igAccounts),
    [] as { id: string; handle: string }[],
  );
  const rulesRes = await safeQuery(
    () => db.select().from(schema.dmRules),
    [] as (typeof schema.dmRules.$inferSelect)[],
  );
  const error = accountsRes.error ?? rulesRes.error;

  return (
    <main className="mx-auto max-w-3xl p-8 space-y-6">
      <h1 className="text-2xl font-bold">{t.rules.title}</h1>
      <p className="text-sm text-neutral-500">{t.rules.hint}</p>
      {error && (
        <div className="rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          {t.dbError}
        </div>
      )}
      {!error && (
        <RulesEditor
          accounts={accountsRes.data}
          rules={rulesRes.data}
          labels={{
            newRule: t.rules.newRule,
            ruleName: t.rules.ruleName,
            keywords: t.rules.keywords,
            replyTemplate: t.rules.replyTemplate,
            captureLead: t.rules.captureLead,
            save: t.rules.save,
            saved: t.rules.saved,
            existing: t.rules.existing,
            noRules: t.rules.noRules,
            connectFirst: t.rules.connectFirst,
            delete: t.rules.delete,
          }}
        />
      )}
    </main>
  );
}
