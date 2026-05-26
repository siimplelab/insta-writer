import { NextResponse, type NextRequest } from "next/server";
import { db, schema } from "@/lib/db/client";
import { verifySignature } from "@/lib/meta/webhook-verify";
import { findMatchingRule, renderTemplate } from "@/lib/dm/match";
import { sendDM } from "@/lib/meta/messaging";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const u = new URL(req.url);
  const mode = u.searchParams.get("hub.mode");
  const token = u.searchParams.get("hub.verify_token");
  const challenge = u.searchParams.get("hub.challenge");
  if (mode === "subscribe" && token === process.env.META_WEBHOOK_VERIFY_TOKEN) {
    return new Response(challenge ?? "", { status: 200 });
  }
  return new Response("forbidden", { status: 403 });
}

type IGEntry = {
  id: string;
  time: number;
  messaging?: {
    sender: { id: string };
    recipient: { id: string };
    message?: { mid: string; text?: string };
  }[];
  changes?: { field: string; value: unknown }[];
};

export async function POST(req: NextRequest) {
  const raw = await req.text();
  const ok = verifySignature(
    raw,
    req.headers.get("x-hub-signature-256"),
    process.env.META_APP_SECRET!,
  );
  if (!ok) return new Response("bad signature", { status: 401 });

  const body = JSON.parse(raw) as { object?: string; entry?: IGEntry[] };
  if (!body.entry) return NextResponse.json({ ok: true });

  for (const entry of body.entry) {
    for (const m of entry.messaging ?? []) {
      const igRecipientId = m.recipient.id; // our IG business user id
      const senderId = m.sender.id;
      const text = m.message?.text;

      const acct = await db.query.igAccounts.findFirst({
        where: eq(schema.igAccounts.igUserId, igRecipientId),
      });
      if (!acct) continue;

      await db.insert(schema.messagesLog).values({
        accountId: acct.id,
        direction: "in",
        igUserId: senderId,
        body: text ?? null,
        payload: m as unknown as Record<string, unknown>,
      });

      if (!text) continue;

      const rules = await db.query.dmRules.findMany({
        where: eq(schema.dmRules.accountId, acct.id),
      });
      const rule = findMatchingRule(
        rules.map((r) => ({
          id: r.id,
          triggerKeywords: r.triggerKeywords,
          match: r.match,
          enabled: r.enabled,
        })),
        text,
      );
      if (!rule) continue;
      const ruleRow = rules.find((r) => r.id === rule.id)!;

      const reply = renderTemplate(ruleRow.replyTemplate, { username: senderId });
      try {
        await sendDM({ token: acct.longLivedToken, igUserId: acct.igUserId }, senderId, reply);
        await db.insert(schema.messagesLog).values({
          accountId: acct.id,
          direction: "out",
          igUserId: senderId,
          body: reply,
          payload: { ruleId: ruleRow.id },
        });
        if (ruleRow.tagAsLead) {
          await db
            .insert(schema.leads)
            .values({
              accountId: acct.id,
              igUserId: senderId,
              lastMsgAt: new Date(),
              sourceRuleId: ruleRow.id,
            })
            .onConflictDoNothing();
        }
      } catch (e) {
        await db.insert(schema.messagesLog).values({
          accountId: acct.id,
          direction: "out",
          igUserId: senderId,
          body: null,
          payload: { error: (e as Error).message },
        });
      }
    }
  }

  return NextResponse.json({ ok: true });
}
