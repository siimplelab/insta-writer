"use server";

import { revalidatePath } from "next/cache";
import { db, schema } from "@/lib/db/client";
import { z } from "zod";

const createSchema = z.object({
  accountId: z.string().uuid(),
  kind: z.enum(["photo", "carousel", "reel", "story"]),
  caption: z.string().max(2200).optional(),
  firstComment: z.string().max(2200).optional(),
  scheduledFor: z.string().datetime(),
  media: z
    .array(
      z.object({
        blobUrl: z.string().url(),
        mime: z.string(),
        width: z.number().int().optional(),
        height: z.number().int().optional(),
      }),
    )
    .min(1),
});

export async function createScheduledPost(input: z.input<typeof createSchema>) {
  const data = createSchema.parse(input);
  const [post] = await db
    .insert(schema.posts)
    .values({
      accountId: data.accountId,
      kind: data.kind,
      caption: data.caption,
      firstComment: data.firstComment,
      scheduledFor: new Date(data.scheduledFor),
      status: "queued",
    })
    .returning({ id: schema.posts.id });

  await db.insert(schema.postMedia).values(
    data.media.map((m, i) => ({
      postId: post.id,
      blobUrl: m.blobUrl,
      mime: m.mime,
      width: m.width,
      height: m.height,
      order: i,
    })),
  );

  revalidatePath("/");
  revalidatePath("/calendar");
  return { id: post.id };
}
