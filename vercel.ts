import { type VercelConfig } from "@vercel/config/v1";

// NOTE: This app uses local SQLite for storage. Vercel Function filesystems are
// ephemeral between invocations, so a Vercel deployment will NOT persist data.
// Run locally with `npm run dev` and tunnel webhooks via ngrok. This file is
// kept only so the project can still build on Vercel if desired (e.g. for
// preview of static UI).
export const config: VercelConfig = {
  framework: "nextjs",
  buildCommand: "npm run build",
  crons: [],
};
