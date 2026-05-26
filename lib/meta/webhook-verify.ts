import { createHmac, timingSafeEqual } from "node:crypto";

export function verifySignature(rawBody: string, header: string | null, appSecret: string): boolean {
  if (!header) return false;
  const [scheme, sig] = header.split("=");
  if (scheme !== "sha256" || !sig) return false;
  const expected = createHmac("sha256", appSecret).update(rawBody).digest("hex");
  const a = Buffer.from(sig, "hex");
  const b = Buffer.from(expected, "hex");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
