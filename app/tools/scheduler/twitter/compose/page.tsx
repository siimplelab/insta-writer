import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { db, schema } from "@/lib/db/client";
import { TweetComposer } from "./composer";
import { safeQuery } from "@/lib/db/safe";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
    <div className="mx-auto max-w-5xl px-6 py-10 md:py-12 space-y-8">
      <Button variant="ghost" size="sm" className="-ml-3" asChild>
        <Link href="/tools/scheduler/twitter"><ArrowLeft className="h-4 w-4" /> Twitter</Link>
      </Button>

      <header className="space-y-3">
        <Badge variant="secondary">Compose · X</Badge>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Compose tweet</h1>
      </header>

      {error && (
        <Alert variant="warning">
          <AlertTitle>Database issue</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!error && accounts.length === 0 ? (
        <Alert variant="info">
          <AlertTitle>Connect an account first</AlertTitle>
          <AlertDescription>
            <Button variant="outline" size="sm" className="mt-2" asChild>
              <Link href="/tools/scheduler/twitter">Open Twitter page →</Link>
            </Button>
          </AlertDescription>
        </Alert>
      ) : (
        accounts.length > 0 && <TweetComposer accounts={accounts} />
      )}
    </div>
  );
}
