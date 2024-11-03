// import { pgTable, serial, text, uuid, varchar, boolean, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";


export const post = sqliteTable("posts", {
    id: integer("id",{mode:'number'}).primaryKey({autoIncrement:true}),
    title: text("title").notNull(),
    body: text("body").notNull(),
    createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`)
});
    // id: uuid("id").primaryKey().defaultRandom(),
    // title: varchar("title").notNull(),
    // createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    // body: text("body").notNull(),

export const user = sqliteTable("users", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: integer("email_verified",{mode:'boolean'}).notNull().default(sql`0`),
    image: text("image").notNull(),
    createdAt: text("created_at").notNull().default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text("updated_at").notNull().default(sql`(CURRENT_TIMESTAMP)`)
});

// export const user = pgTable("users", {
//     id: varchar("id").primaryKey(),
//     name: varchar("name", { length: 255 }),
//     email: varchar("email", { length: 255 }).notNull().unique(),
//     emailVerified: boolean("email_verfied").default(false),
//     image: text("image"),
//     createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
//     updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow()
// })

