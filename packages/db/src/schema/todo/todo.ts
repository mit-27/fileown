import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const todo = sqliteTable('todo', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    content: text('task'),
    createdAt: integer("created_at", { mode: "timestamp" }).default(
        sql`(strftime('%s', 'now'))`,
    )
})