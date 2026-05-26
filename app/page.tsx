import Link from "next/link";
import { db, schema } from "@/lib/db/client";
import { desc } from "drizzle-orm";
import { safeQuery } from "@/lib/db/safe";
import { getDict } from "@/lib/i18n/server";

export const dynamic = "force-dynamic";

export default async function Home() {
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

  return (
    <main className="mx-auto max-w-4xl p-8 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">{t.appTitle}</h1>
        <p className="text-sm text-neutral-500">{t.tagline}</p>
      </header>

      {dbError && (
        <div className="rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200">
          {t.dbError}
          <pre className="mt-2 text-xs opacity-70">{dbError}</pre>
        </div>
      )}

      <section className="space-y-2">
        <h2 className="font-semibold">{t.connectedAccounts}</h2>
        {accounts.length === 0 ? (
          <Link
            href="/api/meta/oauth/start"
            className="inline-block rounded bg-black px-4 py-2 text-white"
          >
            {t.connectButton}
          </Link>
        ) : (
          <ul className="text-sm">
            {accounts.map((a) => (
              <li key={a.id}>
                @{a.handle} — {t.tokenExpires} {a.tokenExpiresAt.toISOString().slice(0, 10)}
              </li>
            ))}
          </ul>
        )}
      </section>

      <nav className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {[
          [t.nav.compose, "/compose"],
          [t.nav.calendar, "/calendar"],
          [t.nav.inbox, "/inbox"],
          [t.nav.rules, "/rules"],
          [t.nav.leads, "/leads"],
          [t.nav.analytics, "/analytics"],
          [t.nav.settings, "/settings"],
        ].map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className="rounded border border-neutral-200 p-4 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
          >
            {label}
          </Link>
        ))}
      </nav>

      <section className="space-y-2">
        <h2 className="font-semibold">{t.recentPosts}</h2>
        {upcoming.length === 0 ? (
          <p className="text-sm text-neutral-500">{t.noPosts}</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-neutral-500">
                <th>{t.cols.when}</th>
                <th>{t.cols.kind}</th>
                <th>{t.cols.status}</th>
              </tr>
            </thead>
            <tbody>
              {upcoming.map((p) => (
                <tr key={p.id} className="border-t border-neutral-200 dark:border-neutral-800">
                  <td>{p.scheduledFor.toISOString().slice(0, 16).replace("T", " ")}</td>
                  <td>{p.kind}</td>
                  <td>{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}
