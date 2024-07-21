import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const contents = sqliteTable("contents", {
    key: text("key").notNull().primaryKey(),
    id: text("id"),
    title: text("title").notNull(),
    auther: text("auther").notNull(),
    category: text("category").notNull(),
    description: text("description").notNull(),
    time: text("time").notNull(),
    duration: integer("duration").notNull(),
    countdown: integer("countdown").notNull(),
    approved: integer("approved", {mode: "boolean"}).notNull().default(false)
});
