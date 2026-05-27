import { z } from "zod";

const schema = z.object({
  DB_PATH: z.string().min(1).default("data/app.db"),
  META_APP_ID: z.string().min(1),
  META_APP_SECRET: z.string().min(1),
  META_WEBHOOK_VERIFY_TOKEN: z.string().min(1),
  META_GRAPH_VERSION: z.string().default("v21.0"),
  META_REDIRECT_URI: z.string().url(),
  BLOB_READ_WRITE_TOKEN: z.string().min(1).optional(),
  AI_GATEWAY_API_KEY: z.string().min(1).optional(),
  CRON_SECRET: z.string().min(1),
  APP_API_KEY: z.string().min(16).optional(),
  NEXT_PUBLIC_APP_URL: z.string().url(),
});

export const env = schema.parse({
  DB_PATH: process.env.DB_PATH,
  META_APP_ID: process.env.META_APP_ID,
  META_APP_SECRET: process.env.META_APP_SECRET,
  META_WEBHOOK_VERIFY_TOKEN: process.env.META_WEBHOOK_VERIFY_TOKEN,
  META_GRAPH_VERSION: process.env.META_GRAPH_VERSION,
  META_REDIRECT_URI: process.env.META_REDIRECT_URI,
  BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
  AI_GATEWAY_API_KEY: process.env.AI_GATEWAY_API_KEY,
  CRON_SECRET: process.env.CRON_SECRET,
  APP_API_KEY: process.env.APP_API_KEY,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
});
