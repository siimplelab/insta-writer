import { NextResponse, type NextRequest } from "next/server";
import { db, schema } from "@/lib/db/client";
import {
  exchangeCodeForToken,
  exchangeForLongLived,
  listPages,
  resolveInstagramAccount,
} from "@/lib/meta/oauth";
export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieState = req.cookies.get("meta_oauth_state")?.value;
  if (!code || !state || state !== cookieState) {
    return NextResponse.json({ error: "invalid_state" }, { status: 400 });
  }

  const short = await exchangeCodeForToken(code);
  const long = await exchangeForLongLived(short.access_token);
  const pages = await listPages(long.access_token);

  const linked: string[] = [];
  for (const page of pages.data) {
    const ig = await resolveInstagramAccount(page.id, page.access_token);
    const acct = ig.instagram_business_account;
    if (!acct) continue;
    const expiresAt = new Date(Date.now() + long.expires_in * 1000);
    await db
      .insert(schema.igAccounts)
      .values({
        igUserId: acct.id,
        pageId: page.id,
        handle: acct.username,
        longLivedToken: page.access_token,
        tokenExpiresAt: expiresAt,
      })
      .onConflictDoUpdate({
        target: schema.igAccounts.igUserId,
        set: {
          handle: acct.username,
          longLivedToken: page.access_token,
          tokenExpiresAt: expiresAt,
          pageId: page.id,
        },
      });
    linked.push(acct.username);
  }

  const dest = new URL("/tools/scheduler?connected=" + encodeURIComponent(linked.join(",")), url.origin);
  const res = NextResponse.redirect(dest);
  res.cookies.delete("meta_oauth_state");
  return res;
}
