import { type VercelConfig } from "@vercel/config/v1";

export const config: VercelConfig = {
  framework: "nextjs",
  buildCommand: "npm run build",
  crons: [
    { path: "/api/cron/publish-due", schedule: "* * * * *" },
    { path: "/api/cron/refresh-tokens", schedule: "0 3 * * *" },
    { path: "/api/cron/pull-insights", schedule: "15 * * * *" },
  ],
};
