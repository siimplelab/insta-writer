import { headers } from "next/headers";

export async function assertCron() {
  const h = await headers();
  const provided = h.get("x-cron-secret") ?? h.get("authorization")?.replace(/^Bearer\s+/i, "");
  const expected = process.env.CRON_SECRET;
  if (!expected || provided !== expected) {
    throw new Response("unauthorized", { status: 401 });
  }
}
