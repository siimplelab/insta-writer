import { eq } from "drizzle-orm";
import { db, schema } from "@/lib/db/client";
import { refresh } from "./oauth";

const API = "https://api.twitter.com";
const UPLOAD_API = "https://api.x.com"; // v2 media upload lives on api.x.com

const SAFETY_WINDOW_MS = 5 * 60 * 1000;

/**
 * Returns a valid bearer token for the given account, refreshing it if
 * within 5 minutes of expiry. Updates the row in-place.
 */
export async function ensureToken(accountId: string): Promise<{ token: string; account: typeof schema.twAccounts.$inferSelect }> {
  const acct = await db.query.twAccounts.findFirst({
    where: eq(schema.twAccounts.id, accountId),
  });
  if (!acct) throw new Error("twitter account not found");

  if (acct.tokenExpiresAt.getTime() - Date.now() > SAFETY_WINDOW_MS) {
    return { token: acct.accessToken, account: acct };
  }
  if (!acct.refreshToken) {
    throw new Error("twitter token expired and no refresh token available — reconnect the account");
  }
  const r = await refresh(acct.refreshToken);
  const expiresAt = new Date(Date.now() + r.expires_in * 1000);
  await db
    .update(schema.twAccounts)
    .set({
      accessToken: r.access_token,
      refreshToken: r.refresh_token ?? acct.refreshToken,
      tokenExpiresAt: expiresAt,
    })
    .where(eq(schema.twAccounts.id, accountId));
  return {
    token: r.access_token,
    account: { ...acct, accessToken: r.access_token, tokenExpiresAt: expiresAt },
  };
}

export class TwError extends Error {
  constructor(public status: number, public body: unknown, msg: string) {
    super(msg);
  }
}

async function jsonResponse(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export async function api<T>(
  token: string,
  path: string,
  init: RequestInit & { uploadHost?: boolean } = {},
): Promise<T> {
  const base = init.uploadHost ? UPLOAD_API : API;
  const res = await fetch(`${base}${path.startsWith("/") ? path : `/${path}`}`, {
    ...init,
    headers: {
      authorization: `Bearer ${token}`,
      ...(init.body && !(init.body instanceof FormData)
        ? { "content-type": "application/json" }
        : {}),
      ...(init.headers ?? {}),
    },
  });
  const body = await jsonResponse(res);
  if (!res.ok) {
    const msg =
      (body && typeof body === "object" && "detail" in body
        ? (body as { detail: string }).detail
        : null) ??
      (body && typeof body === "object" && "title" in body
        ? (body as { title: string }).title
        : null) ??
      `twitter ${res.status}`;
    throw new TwError(res.status, body, msg);
  }
  return body as T;
}
