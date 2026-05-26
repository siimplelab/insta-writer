CREATE TYPE "public"."dm_match_mode" AS ENUM('contains', 'exact', 'regex');--> statement-breakpoint
CREATE TYPE "public"."msg_direction" AS ENUM('in', 'out');--> statement-breakpoint
CREATE TYPE "public"."post_kind" AS ENUM('photo', 'carousel', 'reel', 'story');--> statement-breakpoint
CREATE TYPE "public"."post_status" AS ENUM('draft', 'queued', 'publishing', 'posted', 'failed');--> statement-breakpoint
CREATE TABLE "dm_rules" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_id" uuid NOT NULL,
	"name" text NOT NULL,
	"trigger_keywords" text[] NOT NULL,
	"match" "dm_match_mode" DEFAULT 'contains' NOT NULL,
	"reply_template" text NOT NULL,
	"quick_replies" jsonb,
	"tag_as_lead" boolean DEFAULT true NOT NULL,
	"enabled" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ig_accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"ig_user_id" text NOT NULL,
	"page_id" text NOT NULL,
	"handle" text NOT NULL,
	"long_lived_token" text NOT NULL,
	"token_expires_at" timestamp with time zone NOT NULL,
	"connected_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "insights_snapshots" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_id" uuid NOT NULL,
	"day" date NOT NULL,
	"reach" integer,
	"impressions" integer,
	"profile_views" integer,
	"followers" integer,
	"raw" jsonb
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_id" uuid NOT NULL,
	"ig_user_id" text NOT NULL,
	"username" text,
	"first_seen" timestamp with time zone DEFAULT now() NOT NULL,
	"last_msg_at" timestamp with time zone,
	"source_rule_id" uuid,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "messages_log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_id" uuid NOT NULL,
	"direction" "msg_direction" NOT NULL,
	"ig_user_id" text NOT NULL,
	"body" text,
	"payload" jsonb,
	"ts" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "post_media" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"post_id" uuid NOT NULL,
	"blob_url" text NOT NULL,
	"mime" text NOT NULL,
	"width" integer,
	"height" integer,
	"order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_id" uuid NOT NULL,
	"kind" "post_kind" NOT NULL,
	"caption" text,
	"first_comment" text,
	"scheduled_for" timestamp with time zone NOT NULL,
	"status" "post_status" DEFAULT 'draft' NOT NULL,
	"ig_media_id" text,
	"ig_container_id" text,
	"error" text,
	"attempts" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "dm_rules" ADD CONSTRAINT "dm_rules_account_id_ig_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."ig_accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "insights_snapshots" ADD CONSTRAINT "insights_snapshots_account_id_ig_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."ig_accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_account_id_ig_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."ig_accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_source_rule_id_dm_rules_id_fk" FOREIGN KEY ("source_rule_id") REFERENCES "public"."dm_rules"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages_log" ADD CONSTRAINT "messages_log_account_id_ig_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."ig_accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_media" ADD CONSTRAINT "post_media_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_account_id_ig_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."ig_accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "ig_accounts_ig_user_id_idx" ON "ig_accounts" USING btree ("ig_user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "insights_account_day_idx" ON "insights_snapshots" USING btree ("account_id","day");--> statement-breakpoint
CREATE UNIQUE INDEX "leads_account_user_idx" ON "leads" USING btree ("account_id","ig_user_id");--> statement-breakpoint
CREATE INDEX "msglog_conv_idx" ON "messages_log" USING btree ("account_id","ig_user_id","ts");--> statement-breakpoint
CREATE INDEX "posts_due_idx" ON "posts" USING btree ("status","scheduled_for");--> statement-breakpoint
CREATE INDEX "posts_account_idx" ON "posts" USING btree ("account_id");