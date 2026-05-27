import { db, schema } from "@/lib/db/client";
import { Composer } from "./composer";
import { safeQuery } from "@/lib/db/safe";
import { getDict } from "@/lib/i18n/server";

export const dynamic = "force-dynamic";

export default async function ComposePage() {
  const t = await getDict();
  const { data: accounts, error } = await safeQuery(
    () =>
      db
        .select({ id: schema.igAccounts.id, handle: schema.igAccounts.handle })
        .from(schema.igAccounts),
    [] as { id: string; handle: string }[],
  );

  return (
    <main className="mx-auto max-w-2xl p-8 space-y-6">
      <h1 className="text-2xl font-bold">{t.compose.title}</h1>
      {error && (
        <div className="rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          {t.dbError}
          <pre className="mt-2 text-xs opacity-70">{error}</pre>
        </div>
      )}
      {!error && accounts.length === 0 ? (
        <div className="space-y-2 text-sm">
          <p className="text-neutral-500">{t.compose.connectFirst}</p>
          <a href="/" className="inline-block underline">
            ← Go to home
          </a>
          <span className="mx-2 text-neutral-400">·</span>
          <a href="/guides/switch-to-creator" className="inline-block underline">
            {t.onboardingCta}
          </a>
        </div>
      ) : (
        accounts.length > 0 && (
          <Composer
            accounts={accounts}
            labels={{
              account: t.compose.account,
              kind: t.compose.kind,
              photo: t.compose.photo,
              carousel: t.compose.carousel,
              reel: t.compose.reel,
              story: t.compose.story,
              media: t.compose.media,
              caption: t.compose.caption,
              aiSuggest: t.compose.aiSuggest,
              firstComment: t.compose.firstComment,
              scheduledFor: t.compose.scheduledFor,
              schedule: t.compose.schedule,
              scheduled: t.compose.scheduled,
              uploadFirst: t.compose.uploadFirst,
              uploadAtLeastOne: t.compose.uploadAtLeastOne,
              noCaptionReturned: t.compose.noCaptionReturned,
            }}
          />
        )
      )}
    </main>
  );
}
