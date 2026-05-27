"use server";

import { revalidatePath } from "next/cache";
import { db, schema } from "@/lib/db/client";
import { z } from "zod";

const createSchema = z.object({
  accountId: z.string().min(1),
  text: z.string().min(1).max(280),
  scheduledFor: z.string().datetime(),
  media: z
    .array(z.object({ blobUrl: z.string().url(), mime: z.string() }))
    .max(4)
    .optional(),
});

export async function createScheduledTweet(input: z.input<typeof createSchema>) {
  const data = createSchema.parse(input);
  const [tweet] = await db
    .insert(schema.tweets)
    .values({
      accountId: data.accountId,
      text: data.text,
      scheduledFor: new Date(data.scheduledFor),
      status: "queued",
    })
    .returning({ id: schema.tweets.id });
  if (data.media?.length) {
    await db.insert(schema.tweetMedia).values(
      data.media.map((m, i) => ({
        tweetId: tweet.id,
        blobUrl: m.blobUrl,
        mime: m.mime,
        order: i,
      })),
    );
  }
  revalidatePath("/twitter");
  return { id: tweet.id };
}
