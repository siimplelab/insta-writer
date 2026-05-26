import { NextResponse } from "next/server";
import { lt } from "drizzle-orm";
import { db, schema } from "@/lib/db/client";
import { assertCron } from "@/lib/cron-auth";
import { exchangeForLongLived } from "@/lib/meta/oauth";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";

const REFRESH_WINDOW_DAYS = 14;

export async function GET() {
  try {
    await assertCron();
  } catch (r) {
    return r as Response;
  }

  const threshold = new Date(Date.now() + REFRESH_WINDOW_DAYS * 24 * 60 * 60 * 1000);
  const stale = await db
    .select()
    .from(schema.igAccounts)
    .where(lt(schema.igAccounts.tokenExpiresAt, threshold));

  let refreshed = 0;
  for (const a of stale) {
    try {
      const r = await exchangeForLongLived(a.longLivedToken);
      await db
        .update(schema.igAccounts)
        .set({
          longLivedToken: r.access_token,
          tokenExpiresAt: new Date(Date.now() + r.expires_in * 1000),
        })
        .where(eq(schema.igAccounts.id, a.id));
      refreshed++;
    } catch {
      /* log + continue */
    }
  }
  return NextResponse.json({ refreshed, considered: stale.length });
}
