import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, isAbsolute, join } from "node:path";
import * as schema from "./schema";

const rawPath = process.env.DB_PATH ?? "data/app.db";
const dbPath = isAbsolute(rawPath) ? rawPath : join(process.cwd(), rawPath);

try {
  mkdirSync(dirname(dbPath), { recursive: true });
} catch {
  /* ignore on read-only FS (e.g. Vercel runtime) */
}

const globalForDb = globalThis as unknown as {
  sqlite?: Database.Database;
};

const sqlite =
  globalForDb.sqlite ??
  (() => {
    const conn = new Database(dbPath);
    conn.pragma("journal_mode = WAL");
    conn.pragma("foreign_keys = ON");
    return conn;
  })();

if (process.env.NODE_ENV !== "production") globalForDb.sqlite = sqlite;

export const db = drizzle(sqlite, { schema });

// Apply migrations on first import. Idempotent — Drizzle tracks applied
// migrations in a __drizzle_migrations table. If the folder is missing
// (rare edge case in some bundling scenarios), we just skip.
const migrationsFolder = join(process.cwd(), "lib/db/migrations");
const globalForMigrate = globalThis as unknown as { migrated?: boolean };
if (!globalForMigrate.migrated && existsSync(migrationsFolder)) {
  try {
    migrate(db, { migrationsFolder });
    globalForMigrate.migrated = true;
  } catch (e) {
    console.error("[db] migrate failed:", e);
  }
}

export { schema };
