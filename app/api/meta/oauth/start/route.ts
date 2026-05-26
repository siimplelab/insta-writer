import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { authorizeUrl } from "@/lib/meta/oauth";

export const runtime = "nodejs";

export async function GET() {
  const state = randomBytes(16).toString("hex");
  const res = NextResponse.redirect(authorizeUrl(state));
  res.cookies.set("meta_oauth_state", state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 600,
    path: "/",
  });
  return res;
}
