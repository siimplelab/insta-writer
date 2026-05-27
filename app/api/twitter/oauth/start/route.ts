import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { authorizeUrl, genPkce } from "@/lib/twitter/oauth";

export const runtime = "nodejs";

export async function GET() {
  const state = randomBytes(16).toString("hex");
  const { verifier, challenge } = genPkce();
  const res = NextResponse.redirect(authorizeUrl({ state, codeChallenge: challenge }));
  const cookieOpts = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 600,
    path: "/",
  };
  res.cookies.set("tw_oauth_state", state, cookieOpts);
  res.cookies.set("tw_oauth_verifier", verifier, cookieOpts);
  return res;
}
