CREATE TABLE `contents` (
	`key` text PRIMARY KEY NOT NULL,
	`id` text,
	`title` text NOT NULL,
	`auther` text NOT NULL,
	`category` text NOT NULL,
	`description` text NOT NULL,
	`time` text NOT NULL,
	`duration` integer NOT NULL,
	`countdown` integer NOT NULL,
	`approved` integer DEFAULT false NOT NULL
);
