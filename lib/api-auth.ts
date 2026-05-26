import { timingSafeEqual } from "node:crypto";

/**
 * Single-tenant API key auth: extension/clients send
 *   Authorization: Bearer <APP_API_KEY>
 * Generate one with `openssl rand -hex 32` and set in Vercel env.
 */
export function checkApiKey(req: Request): { ok: true } | { ok: false; reason: string } {
  const expected = process.env.APP_API_KEY;
  if (!expected) return { ok: false, reason: "APP_API_KEY not configured on server" };

  const header = req.headers.get("authorization") ?? "";
  const m = header.match(/^Bearer\s+(.+)$/i);
  const provided = m?.[1];
  if (!provided) return { ok: false, reason: "missing bearer token" };

  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return { ok: false, reason: "invalid token" };
  }
  return { ok: true };
}
