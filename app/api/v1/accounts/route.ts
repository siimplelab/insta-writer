import { db, schema } from "@/lib/db/client";
import { checkApiKey } from "@/lib/api-auth";
import { corsJson, preflight } from "@/lib/cors";

export const runtime = "nodejs";

export async function OPTIONS() {
  return preflight();
}

export async function GET(req: Request) {
  const auth = checkApiKey(req);
  if (!auth.ok) return corsJson({ error: auth.reason }, { status: 401 });

  try {
    const accounts = await db
      .select({ id: schema.igAccounts.id, handle: schema.igAccounts.handle })
      .from(schema.igAccounts);
    return corsJson({ accounts });
  } catch (e) {
    return corsJson({ error: (e as Error).message }, { status: 500 });
  }
}
