CREATE TABLE `tw_accounts` (
	`id` text PRIMARY KEY NOT NULL,
	`tw_user_id` text NOT NULL,
	`handle` text NOT NULL,
	`access_token` text NOT NULL,
	`refresh_token` text,
	`token_expires_at` integer NOT NULL,
	`scopes` text NOT NULL,
	`connected_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `tw_accounts_user_id_idx` ON `tw_accounts` (`tw_user_id`);--> statement-breakpoint
CREATE TABLE `tweet_media` (
	`id` text PRIMARY KEY NOT NULL,
	`tweet_id` text NOT NULL,
	`blob_url` text NOT NULL,
	`mime` text NOT NULL,
	`order` integer DEFAULT 0 NOT NULL,
	`tw_media_id` text,
	FOREIGN KEY (`tweet_id`) REFERENCES `tweets`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `tweets` (
	`id` text PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`text` text NOT NULL,
	`scheduled_for` integer NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`posted_id` text,
	`in_reply_to_local_id` text,
	`error` text,
	`attempts` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`account_id`) REFERENCES `tw_accounts`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `tweets_due_idx` ON `tweets` (`status`,`scheduled_for`);--> statement-breakpoint
CREATE INDEX `tweets_account_idx` ON `tweets` (`account_id`);