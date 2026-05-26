import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  integer,
  jsonb,
  pgEnum,
  index,
  uniqueIndex,
  date,
} from "drizzle-orm/pg-core";

export const postKind = pgEnum("post_kind", [
  "photo",
  "carousel",
  "reel",
  "story",
]);

export const postStatus = pgEnum("post_status", [
  "draft",
  "queued",
  "publishing",
  "posted",
  "failed",
]);

export const matchMode = pgEnum("dm_match_mode", ["contains", "exact", "regex"]);

export const msgDirection = pgEnum("msg_direction", ["in", "out"]);

export const igAccounts = pgTable(
  "ig_accounts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    igUserId: text("ig_user_id").notNull(),
    pageId: text("page_id").notNull(),
    handle: text("handle").notNull(),
    longLivedToken: text("long_lived_token").notNull(),
    tokenExpiresAt: timestamp("token_expires_at", { withTimezone: true }).notNull(),
    connectedAt: timestamp("connected_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => ({
    igUserIdx: uniqueIndex("ig_accounts_ig_user_id_idx").on(t.igUserId),
  }),
);

export const posts = pgTable(
  "posts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    accountId: uuid("account_id")
      .notNull()
      .references(() => igAccounts.id, { onDelete: "cascade" }),
    kind: postKind("kind").notNull(),
    caption: text("caption"),
    firstComment: text("first_comment"),
    scheduledFor: timestamp("scheduled_for", { withTimezone: true }).notNull(),
    status: postStatus("status").notNull().default("draft"),
    igMediaId: text("ig_media_id"),
    igContainerId: text("ig_container_id"),
    error: text("error"),
    attempts: integer("attempts").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => ({
    dueIdx: index("posts_due_idx").on(t.status, t.scheduledFor),
    acctIdx: index("posts_account_idx").on(t.accountId),
  }),
);

export const postMedia = pgTable("post_media", {
  id: uuid("id").defaultRandom().primaryKey(),
  postId: uuid("post_id")
    .notNull()
    .references(() => posts.id, { onDelete: "cascade" }),
  blobUrl: text("blob_url").notNull(),
  mime: text("mime").notNull(),
  width: integer("width"),
  height: integer("height"),
  order: integer("order").notNull().default(0),
});

export const dmRules = pgTable("dm_rules", {
  id: uuid("id").defaultRandom().primaryKey(),
  accountId: uuid("account_id")
    .notNull()
    .references(() => igAccounts.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  triggerKeywords: text("trigger_keywords").array().notNull(),
  match: matchMode("match").notNull().default("contains"),
  replyTemplate: text("reply_template").notNull(),
  quickReplies: jsonb("quick_replies").$type<{ title: string; payload: string }[]>(),
  tagAsLead: boolean("tag_as_lead").notNull().default(true),
  enabled: boolean("enabled").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const leads = pgTable(
  "leads",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    accountId: uuid("account_id")
      .notNull()
      .references(() => igAccounts.id, { onDelete: "cascade" }),
    igUserId: text("ig_user_id").notNull(),
    username: text("username"),
    firstSeen: timestamp("first_seen", { withTimezone: true }).defaultNow().notNull(),
    lastMsgAt: timestamp("last_msg_at", { withTimezone: true }),
    sourceRuleId: uuid("source_rule_id").references(() => dmRules.id, {
      onDelete: "set null",
    }),
    notes: text("notes"),
  },
  (t) => ({
    uniqLead: uniqueIndex("leads_account_user_idx").on(t.accountId, t.igUserId),
  }),
);

export const messagesLog = pgTable(
  "messages_log",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    accountId: uuid("account_id")
      .notNull()
      .references(() => igAccounts.id, { onDelete: "cascade" }),
    direction: msgDirection("direction").notNull(),
    igUserId: text("ig_user_id").notNull(),
    body: text("body"),
    payload: jsonb("payload"),
    ts: timestamp("ts", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => ({
    convIdx: index("msglog_conv_idx").on(t.accountId, t.igUserId, t.ts),
  }),
);

export const insightsSnapshots = pgTable(
  "insights_snapshots",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    accountId: uuid("account_id")
      .notNull()
      .references(() => igAccounts.id, { onDelete: "cascade" }),
    day: date("day").notNull(),
    reach: integer("reach"),
    impressions: integer("impressions"),
    profileViews: integer("profile_views"),
    followers: integer("followers"),
    raw: jsonb("raw"),
  },
  (t) => ({
    uniqDay: uniqueIndex("insights_account_day_idx").on(t.accountId, t.day),
  }),
);
