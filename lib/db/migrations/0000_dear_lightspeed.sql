CREATE TABLE `dm_rules` (
	`id` text PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`name` text NOT NULL,
	`trigger_keywords` text NOT NULL,
	`match` text DEFAULT 'contains' NOT NULL,
	`reply_template` text NOT NULL,
	`quick_replies` text,
	`tag_as_lead` integer DEFAULT true NOT NULL,
	`enabled` integer DEFAULT true NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`account_id`) REFERENCES `ig_accounts`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `ig_accounts` (
	`id` text PRIMARY KEY NOT NULL,
	`ig_user_id` text NOT NULL,
	`page_id` text NOT NULL,
	`handle` text NOT NULL,
	`long_lived_token` text NOT NULL,
	`token_expires_at` integer NOT NULL,
	`connected_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `ig_accounts_ig_user_id_idx` ON `ig_accounts` (`ig_user_id`);--> statement-breakpoint
CREATE TABLE `insights_snapshots` (
	`id` text PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`day` text NOT NULL,
	`reach` integer,
	`impressions` integer,
	`profile_views` integer,
	`followers` integer,
	`raw` text,
	FOREIGN KEY (`account_id`) REFERENCES `ig_accounts`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `insights_account_day_idx` ON `insights_snapshots` (`account_id`,`day`);--> statement-breakpoint
CREATE TABLE `leads` (
	`id` text PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`ig_user_id` text NOT NULL,
	`username` text,
	`first_seen` integer NOT NULL,
	`last_msg_at` integer,
	`source_rule_id` text,
	`notes` text,
	FOREIGN KEY (`account_id`) REFERENCES `ig_accounts`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`source_rule_id`) REFERENCES `dm_rules`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `leads_account_user_idx` ON `leads` (`account_id`,`ig_user_id`);--> statement-breakpoint
CREATE TABLE `messages_log` (
	`id` text PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`direction` text NOT NULL,
	`ig_user_id` text NOT NULL,
	`body` text,
	`payload` text,
	`ts` integer NOT NULL,
	FOREIGN KEY (`account_id`) REFERENCES `ig_accounts`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `msglog_conv_idx` ON `messages_log` (`account_id`,`ig_user_id`,`ts`);--> statement-breakpoint
CREATE TABLE `post_media` (
	`id` text PRIMARY KEY NOT NULL,
	`post_id` text NOT NULL,
	`blob_url` text NOT NULL,
	`mime` text NOT NULL,
	`width` integer,
	`height` integer,
	`order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` text PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`kind` text NOT NULL,
	`caption` text,
	`first_comment` text,
	`scheduled_for` integer NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`ig_media_id` text,
	`ig_container_id` text,
	`error` text,
	`attempts` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`account_id`) REFERENCES `ig_accounts`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `posts_due_idx` ON `posts` (`status`,`scheduled_for`);--> statement-breakpoint
CREATE INDEX `posts_account_idx` ON `posts` (`account_id`);