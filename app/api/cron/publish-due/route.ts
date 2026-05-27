import { NextResponse } from "next/server";
import { and, asc, eq, lte, sql } from "drizzle-orm";
import { db, schema } from "@/lib/db/client";
import { assertCron } from "@/lib/cron-auth";
import {
  publishPhoto,
  publishReel,
  publishCarousel,
  publishStoryImage,
  postFirstComment,
} from "@/lib/meta/publish";
import { ensureToken } from "@/lib/twitter/client";
import { uploadImage, postTweet } from "@/lib/twitter/publish";

export const runtime = "nodejs";
export const maxDuration = 300;

const BATCH = 5;
// Anything queued more than this many hours in the past gets skipped and
// marked failed — protects against e.g. "sale this weekend" posts going out
// on Wednesday after a 4-day laptop closure.
const STALE_HOURS = 24;

export async function GET() {
  try {
    await assertCron();
  } catch (r) {
    return r as Response;
  }

  const now = new Date();
  const staleCutoff = new Date(now.getTime() - STALE_HOURS * 3600_000);

  // First: mark any queued post older than STALE_HOURS as failed-stale.
  const stalePosts = await db
    .update(schema.posts)
    .set({
      status: "failed",
      error: `skipped — scheduled time was more than ${STALE_HOURS}h ago`,
      updatedAt: now,
    })
    .where(
      and(
        eq(schema.posts.status, "queued"),
        lte(schema.posts.scheduledFor, staleCutoff),
      ),
    )
    .returning({ id: schema.posts.id });

  const due = await db
    .select()
    .from(schema.posts)
    .where(
      and(
        eq(schema.posts.status, "queued"),
        lte(schema.posts.scheduledFor, now),
      ),
    )
    .orderBy(asc(schema.posts.scheduledFor))
    .limit(BATCH);

  const results: { id: string; ok: boolean; error?: string }[] = [];
  const skipped: string[] = stalePosts.map((p) => p.id);

  for (const post of due) {
    const claim = await db
      .update(schema.posts)
      .set({ status: "publishing", attempts: sql`${schema.posts.attempts} + 1`, updatedAt: new Date() })
      .where(and(eq(schema.posts.id, post.id), eq(schema.posts.status, "queued")))
      .returning({ id: schema.posts.id });
    if (!claim.length) continue;

    const acct = await db.query.igAccounts.findFirst({
      where: eq(schema.igAccounts.id, post.accountId),
    });
    if (!acct) {
      await db
        .update(schema.posts)
        .set({ status: "failed", error: "account missing" })
        .where(eq(schema.posts.id, post.id));
      results.push({ id: post.id, ok: false, error: "account missing" });
      continue;
    }
    const media = await db.query.postMedia.findMany({
      where: eq(schema.postMedia.postId, post.id),
      orderBy: (m, { asc }) => [asc(m.order)],
    });
    const t = { token: acct.longLivedToken, igUserId: acct.igUserId };

    try {
      let mediaId: string;
      if (post.kind === "photo") {
        if (!media[0]) throw new Error("no media");
        mediaId = await publishPhoto(t, media[0].blobUrl, post.caption ?? undefined);
      } else if (post.kind === "reel") {
        if (!media[0]) throw new Error("no media");
        mediaId = await publishReel(t, media[0].blobUrl, post.caption ?? undefined);
      } else if (post.kind === "carousel") {
        mediaId = await publishCarousel(
          t,
          media.map((m) => ({
            url: m.blobUrl,
            kind: m.mime.startsWith("video/") ? "video" : "image",
          })),
          post.caption ?? undefined,
        );
      } else {
        if (!media[0]) throw new Error("no media");
        mediaId = await publishStoryImage(t, media[0].blobUrl);
      }

      if (post.firstComment) {
        try {
          await postFirstComment(t, mediaId, post.firstComment);
        } catch {
          /* non-fatal */
        }
      }

      await db
        .update(schema.posts)
        .set({ status: "posted", igMediaId: mediaId, error: null, updatedAt: new Date() })
        .where(eq(schema.posts.id, post.id));
      results.push({ id: post.id, ok: true });
    } catch (e) {
      const err = e instanceof Error ? e.message : String(e);
      await db
        .update(schema.posts)
        .set({ status: "failed", error: err, updatedAt: new Date() })
        .where(eq(schema.posts.id, post.id));
      results.push({ id: post.id, ok: false, error: err });
    }
  }

  // ---- Twitter / X ---------------------------------------------------------
  const staleTweets = await db
    .update(schema.tweets)
    .set({
      status: "failed",
      error: `skipped — scheduled time was more than ${STALE_HOURS}h ago`,
      updatedAt: now,
    })
    .where(
      and(
        eq(schema.tweets.status, "queued"),
        lte(schema.tweets.scheduledFor, staleCutoff),
      ),
    )
    .returning({ id: schema.tweets.id });

  const dueTweets = await db
    .select()
    .from(schema.tweets)
    .where(
      and(
        eq(schema.tweets.status, "queued"),
        lte(schema.tweets.scheduledFor, now),
      ),
    )
    .orderBy(asc(schema.tweets.scheduledFor))
    .limit(BATCH);

  const tweetResults: { id: string; ok: boolean; error?: string }[] = [];
  const tweetSkipped: string[] = staleTweets.map((t) => t.id);
  for (const tweet of dueTweets) {
    const claim = await db
      .update(schema.tweets)
      .set({
        status: "publishing",
        attempts: sql`${schema.tweets.attempts} + 1`,
        updatedAt: new Date(),
      })
      .where(and(eq(schema.tweets.id, tweet.id), eq(schema.tweets.status, "queued")))
      .returning({ id: schema.tweets.id });
    if (!claim.length) continue;

    try {
      const { token } = await ensureToken(tweet.accountId);
      const mediaRows = await db.query.tweetMedia.findMany({
        where: eq(schema.tweetMedia.tweetId, tweet.id),
        orderBy: (m, { asc }) => [asc(m.order)],
      });
      const mediaIds: string[] = [];
      for (const m of mediaRows) {
        // Reuse a cached upload ID if a previous attempt got that far
        const id = m.twMediaId ?? (await uploadImage(token, m.blobUrl, m.mime));
        if (!m.twMediaId) {
          await db
            .update(schema.tweetMedia)
            .set({ twMediaId: id })
            .where(eq(schema.tweetMedia.id, m.id));
        }
        mediaIds.push(id);
      }
      const posted = await postTweet(token, {
        text: tweet.text,
        mediaIds: mediaIds.length ? mediaIds : undefined,
      });
      await db
        .update(schema.tweets)
        .set({ status: "posted", postedId: posted.id, error: null, updatedAt: new Date() })
        .where(eq(schema.tweets.id, tweet.id));
      tweetResults.push({ id: tweet.id, ok: true });
    } catch (e) {
      const err = e instanceof Error ? e.message : String(e);
      await db
        .update(schema.tweets)
        .set({ status: "failed", error: err, updatedAt: new Date() })
        .where(eq(schema.tweets.id, tweet.id));
      tweetResults.push({ id: tweet.id, ok: false, error: err });
    }
  }

  return NextResponse.json({
    posts: { processed: results.length, results, skippedAsStale: skipped },
    tweets: {
      processed: tweetResults.length,
      results: tweetResults,
      skippedAsStale: tweetSkipped,
    },
  });
}
