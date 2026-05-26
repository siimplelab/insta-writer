import { NextResponse } from "next/server";
import { db, schema } from "@/lib/db/client";
import { assertCron } from "@/lib/cron-auth";
import { graph } from "@/lib/meta/client";

export const runtime = "nodejs";

type InsightsRes = {
  data: { name: string; values: { value: number; end_time: string }[] }[];
};

export async function GET() {
  try {
    await assertCron();
  } catch (r) {
    return r as Response;
  }

  const accounts = await db.select().from(schema.igAccounts);
  let upserts = 0;

  for (const a of accounts) {
    try {
      const res = await graph<InsightsRes>(`/${a.igUserId}/insights`, {
        token: a.longLivedToken,
        query: {
          metric: "reach,impressions,profile_views,follower_count",
          period: "day",
        },
      });
      const map: Record<string, Record<string, number>> = {};
      for (const m of res.data) {
        for (const v of m.values) {
          const day = v.end_time.slice(0, 10);
          map[day] ??= {};
          map[day][m.name] = v.value;
        }
      }
      for (const [day, vals] of Object.entries(map)) {
        await db
          .insert(schema.insightsSnapshots)
          .values({
            accountId: a.id,
            day,
            reach: vals.reach ?? null,
            impressions: vals.impressions ?? null,
            profileViews: vals.profile_views ?? null,
            followers: vals.follower_count ?? null,
            raw: vals,
          })
          .onConflictDoUpdate({
            target: [schema.insightsSnapshots.accountId, schema.insightsSnapshots.day],
            set: {
              reach: vals.reach ?? null,
              impressions: vals.impressions ?? null,
              profileViews: vals.profile_views ?? null,
              followers: vals.follower_count ?? null,
              raw: vals,
            },
          });
        upserts++;
      }
    } catch {
      /* per-account isolation */
    }
  }

  return NextResponse.json({ upserts });
}
