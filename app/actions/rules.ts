"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db, schema } from "@/lib/db/client";
import { z } from "zod";

const upsertSchema = z.object({
  id: z.string().uuid().optional(),
  accountId: z.string().uuid(),
  name: z.string().min(1),
  triggerKeywords: z.array(z.string().min(1)).min(1),
  match: z.enum(["contains", "exact", "regex"]),
  replyTemplate: z.string().min(1),
  tagAsLead: z.boolean(),
  enabled: z.boolean(),
});

export async function upsertRule(input: z.input<typeof upsertSchema>) {
  const data = upsertSchema.parse(input);
  if (data.id) {
    await db.update(schema.dmRules).set(data).where(eq(schema.dmRules.id, data.id));
  } else {
    await db.insert(schema.dmRules).values(data);
  }
  revalidatePath("/rules");
}

export async function deleteRule(id: string) {
  await db.delete(schema.dmRules).where(eq(schema.dmRules.id, id));
  revalidatePath("/rules");
}
