import {
  sqliteTable,
  text,
  integer,
  index,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { randomUUID } from "node:crypto";

const id = () =>
  text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID());

const ts = (col: string) =>
  integer(col, { mode: "timestamp_ms" });

const now = () => new Date();

export const igAccounts = sqliteTable(
  "ig_accounts",
  {
    id: id(),
    igUserId: text("ig_user_id").notNull(),
    pageId: text("page_id").notNull(),
    handle: text("handle").notNull(),
    longLivedToken: text("long_lived_token").notNull(),
    tokenExpiresAt: ts("token_expires_at").notNull(),
    connectedAt: ts("connected_at").notNull().$defaultFn(now),
  },
  (t) => ({
    igUserIdx: uniqueIndex("ig_accounts_ig_user_id_idx").on(t.igUserId),
  }),
);

export type PostKind = "photo" | "carousel" | "reel" | "story";
export type PostStatus =
  | "draft"
  | "queued"
  | "publishing"
  | "posted"
  | "failed";

export const posts = sqliteTable(
  "posts",
  {
    id: id(),
    accountId: text("account_id")
      .notNull()
      .references(() => igAccounts.id, { onDelete: "cascade" }),
    kind: text("kind").$type<PostKind>().notNull(),
    caption: text("caption"),
    firstComment: text("first_comment"),
    scheduledFor: ts("scheduled_for").notNull(),
    status: text("status").$type<PostStatus>().notNull().default("draft"),
    igMediaId: text("ig_media_id"),
    igContainerId: text("ig_container_id"),
    error: text("error"),
    attempts: integer("attempts").notNull().default(0),
    createdAt: ts("created_at").notNull().$defaultFn(now),
    updatedAt: ts("updated_at").notNull().$defaultFn(now),
  },
  (t) => ({
    dueIdx: index("posts_due_idx").on(t.status, t.scheduledFor),
    acctIdx: index("posts_account_idx").on(t.accountId),
  }),
);

export const postMedia = sqliteTable("post_media", {
  id: id(),
  postId: text("post_id")
    .notNull()
    .references(() => posts.id, { onDelete: "cascade" }),
  blobUrl: text("blob_url").notNull(),
  mime: text("mime").notNull(),
  width: integer("width"),
  height: integer("height"),
  order: integer("order").notNull().default(0),
});

export type MatchMode = "contains" | "exact" | "regex";

export const dmRules = sqliteTable("dm_rules", {
  id: id(),
  accountId: text("account_id")
    .notNull()
    .references(() => igAccounts.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  triggerKeywords: text("trigger_keywords", { mode: "json" })
    .$type<string[]>()
    .notNull(),
  match: text("match").$type<MatchMode>().notNull().default("contains"),
  replyTemplate: text("reply_template").notNull(),
  quickReplies: text("quick_replies", { mode: "json" }).$type<
    { title: string; payload: string }[]
  >(),
  tagAsLead: integer("tag_as_lead", { mode: "boolean" }).notNull().default(true),
  enabled: integer("enabled", { mode: "boolean" }).notNull().default(true),
  createdAt: ts("created_at").notNull().$defaultFn(now),
});

export const leads = sqliteTable(
  "leads",
  {
    id: id(),
    accountId: text("account_id")
      .notNull()
      .references(() => igAccounts.id, { onDelete: "cascade" }),
    igUserId: text("ig_user_id").notNull(),
    username: text("username"),
    firstSeen: ts("first_seen").notNull().$defaultFn(now),
    lastMsgAt: ts("last_msg_at"),
    sourceRuleId: text("source_rule_id").references(() => dmRules.id, {
      onDelete: "set null",
    }),
    notes: text("notes"),
  },
  (t) => ({
    uniqLead: uniqueIndex("leads_account_user_idx").on(t.accountId, t.igUserId),
  }),
);

export type MsgDirection = "in" | "out";

export const messagesLog = sqliteTable(
  "messages_log",
  {
    id: id(),
    accountId: text("account_id")
      .notNull()
      .references(() => igAccounts.id, { onDelete: "cascade" }),
    direction: text("direction").$type<MsgDirection>().notNull(),
    igUserId: text("ig_user_id").notNull(),
    body: text("body"),
    payload: text("payload", { mode: "json" }),
    ts: ts("ts").notNull().$defaultFn(now),
  },
  (t) => ({
    convIdx: index("msglog_conv_idx").on(t.accountId, t.igUserId, t.ts),
  }),
);

// ---------------------------------------------------------------------------
// Twitter / X
// ---------------------------------------------------------------------------

export const twAccounts = sqliteTable(
  "tw_accounts",
  {
    id: id(),
    twUserId: text("tw_user_id").notNull(),
    handle: text("handle").notNull(),
    accessToken: text("access_token").notNull(),
    refreshToken: text("refresh_token"),
    tokenExpiresAt: ts("token_expires_at").notNull(),
    scopes: text("scopes", { mode: "json" }).$type<string[]>().notNull(),
    connectedAt: ts("connected_at").notNull().$defaultFn(now),
  },
  (t) => ({
    twUserIdx: uniqueIndex("tw_accounts_user_id_idx").on(t.twUserId),
  }),
);

export type TweetStatus =
  | "draft"
  | "queued"
  | "publishing"
  | "posted"
  | "failed";

export const tweets = sqliteTable(
  "tweets",
  {
    id: id(),
    accountId: text("account_id")
      .notNull()
      .references(() => twAccounts.id, { onDelete: "cascade" }),
    text: text("text").notNull(),
    scheduledFor: ts("scheduled_for").notNull(),
    status: text("status").$type<TweetStatus>().notNull().default("draft"),
    // Set after a successful post — the tweet ID returned by Twitter
    postedId: text("posted_id"),
    // For threads — id of the previous tweet (in this app)
    inReplyToLocalId: text("in_reply_to_local_id"),
    error: text("error"),
    attempts: integer("attempts").notNull().default(0),
    createdAt: ts("created_at").notNull().$defaultFn(now),
    updatedAt: ts("updated_at").notNull().$defaultFn(now),
  },
  (t) => ({
    dueIdx: index("tweets_due_idx").on(t.status, t.scheduledFor),
    acctIdx: index("tweets_account_idx").on(t.accountId),
  }),
);

export const tweetMedia = sqliteTable("tweet_media", {
  id: id(),
  tweetId: text("tweet_id")
    .notNull()
    .references(() => tweets.id, { onDelete: "cascade" }),
  blobUrl: text("blob_url").notNull(),
  mime: text("mime").notNull(),
  order: integer("order").notNull().default(0),
  // Twitter's media_id after upload — cached so retries don't re-upload
  twMediaId: text("tw_media_id"),
});

// ---------------------------------------------------------------------------

export const insightsSnapshots = sqliteTable(
  "insights_snapshots",
  {
    id: id(),
    accountId: text("account_id")
      .notNull()
      .references(() => igAccounts.id, { onDelete: "cascade" }),
    // ISO date string YYYY-MM-DD
    day: text("day").notNull(),
    reach: integer("reach"),
    impressions: integer("impressions"),
    profileViews: integer("profile_views"),
    followers: integer("followers"),
    raw: text("raw", { mode: "json" }),
  },
  (t) => ({
    uniqDay: uniqueIndex("insights_account_day_idx").on(t.accountId, t.day),
  }),
);
