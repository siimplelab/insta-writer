import { db, schema } from "@/lib/db/client";
import { TweetComposer } from "./composer";
import { safeQuery } from "@/lib/db/safe";

export const dynamic = "force-dynamic";

export default async function TweetComposePage() {
  const { data: accounts, error } = await safeQuery(
    () =>
      db
        .select({ id: schema.twAccounts.id, handle: schema.twAccounts.handle })
        .from(schema.twAccounts),
    [] as { id: string; handle: string }[],
  );

  return (
    <main className="mx-auto max-w-2xl p-8 space-y-6">
      <h1 className="text-2xl font-bold">Compose tweet</h1>
      {error && (
        <div className="rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          {error}
        </div>
      )}
      {!error && accounts.length === 0 ? (
        <p className="text-sm text-neutral-500">
          Connect a Twitter/X account first from the{" "}
          <a href="/tools/scheduler/twitter" className="underline">
            Twitter page
          </a>
          .
        </p>
      ) : (
        accounts.length > 0 && <TweetComposer accounts={accounts} />
      )}
    </main>
  );
}
