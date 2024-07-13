// id
// userID
// instance type -  'file' || 'folder'
// created_at
import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";


export const Finstance = sqliteTable('Finstances', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    userID: text('userID'),
    type: text('type', { enum: ['file', 'folder'] }).notNull(),
    created_at: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});