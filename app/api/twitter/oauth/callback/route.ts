import { NextResponse, type NextRequest } from "next/server";
import { db, schema } from "@/lib/db/client";
import { exchangeCode, me } from "@/lib/twitter/oauth";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const err = url.searchParams.get("error");
  if (err) {
    return NextResponse.json(
      { error: err, description: url.searchParams.get("error_description") },
      { status: 400 },
    );
  }
  const cookieState = req.cookies.get("tw_oauth_state")?.value;
  const verifier = req.cookies.get("tw_oauth_verifier")?.value;
  if (!code || !state || state !== cookieState || !verifier) {
    return NextResponse.json({ error: "invalid_state" }, { status: 400 });
  }

  const tok = await exchangeCode(code, verifier);
  const profile = await me(tok.access_token);
  const expiresAt = new Date(Date.now() + tok.expires_in * 1000);

  await db
    .insert(schema.twAccounts)
    .values({
      twUserId: profile.id,
      handle: profile.username,
      accessToken: tok.access_token,
      refreshToken: tok.refresh_token ?? null,
      tokenExpiresAt: expiresAt,
      scopes: tok.scope.split(/\s+/),
    })
    .onConflictDoUpdate({
      target: schema.twAccounts.twUserId,
      set: {
        handle: profile.username,
        accessToken: tok.access_token,
        refreshToken: tok.refresh_token ?? null,
        tokenExpiresAt: expiresAt,
        scopes: tok.scope.split(/\s+/),
      },
    });

  const dest = new URL("/tools/scheduler/twitter?connected=" + encodeURIComponent(profile.username), url.origin);
  const res = NextResponse.redirect(dest);
  res.cookies.delete("tw_oauth_state");
  res.cookies.delete("tw_oauth_verifier");
  return res;
}
