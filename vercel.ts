import { type VercelConfig } from "@vercel/config/v1";

export const config: VercelConfig = {
  framework: "nextjs",
  buildCommand: "npm run build",
  // NOTE: Hobby plan limits to 1 cron per day. This is a constraint Vercel enforces.
  // For production use, upgrade to Pro ($20/mo) which unlocks minute-level precision.
  // For development, run `npm run dev` locally — the cron routes are callable on-demand.
  crons: [],
};
