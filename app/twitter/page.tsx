import Link from "next/link";
import { db, schema } from "@/lib/db/client";
import { desc } from "drizzle-orm";
import { safeQuery } from "@/lib/db/safe";

export const dynamic = "force-dynamic";

export default async function TwitterHome() {
  const accountsRes = await safeQuery(
    () => db.select().from(schema.twAccounts),
    [] as (typeof schema.twAccounts.$inferSelect)[],
  );
  const tweetsRes = await safeQuery(
    () =>
      db
        .select()
        .from(schema.tweets)
        .orderBy(desc(schema.tweets.scheduledFor))
        .limit(20),
    [] as (typeof schema.tweets.$inferSelect)[],
  );

  return (
    <main className="mx-auto max-w-3xl p-8 space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold">Twitter / X</h1>
        <p className="text-sm text-neutral-500">
          Schedule tweets to your own X account via the official Twitter API v2.
        </p>
      </header>

      <section className="space-y-2">
        <h2 className="font-semibold">Connected accounts</h2>
        {accountsRes.data.length === 0 ? (
          <Link
            href="/api/twitter/oauth/start"
            className="inline-block rounded bg-black px-4 py-2 text-white"
          >
            Connect Twitter / X
          </Link>
        ) : (
          <ul className="text-sm">
            {accountsRes.data.map((a) => (
              <li key={a.id}>
                @{a.handle} — token expires {a.tokenExpiresAt.toISOString().slice(0, 16)}
                {a.refreshToken ? " (refreshable)" : " (no refresh — reconnect when it expires)"}
              </li>
            ))}
          </ul>
        )}
      </section>

      <nav className="grid grid-cols-2 gap-3 md:grid-cols-3">
        <Link
          href="/twitter/compose"
          className="rounded border p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900"
        >
          Compose tweet
        </Link>
        <Link
          href="/"
          className="rounded border p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900"
        >
          ← Back to IG
        </Link>
      </nav>

      <section className="space-y-2">
        <h2 className="font-semibold">Recent tweets</h2>
        {tweetsRes.data.length === 0 ? (
          <p className="text-sm text-neutral-500">No tweets yet.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {tweetsRes.data.map((t) => (
              <li key={t.id} className="rounded border p-3">
                <div className="text-xs text-neutral-500">
                  {t.scheduledFor.toISOString().slice(0, 16).replace("T", " ")} — {t.status}
                  {t.postedId
                    ? ` — id ${t.postedId.slice(0, 10)}…`
                    : t.error
                    ? ` — ${t.error}`
                    : ""}
                </div>
                <div className="whitespace-pre-wrap">{t.text}</div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
