CREATE TABLE `todo` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`task` text,
	`created_at` integer DEFAULT (strftime('%s', 'now'))
);
