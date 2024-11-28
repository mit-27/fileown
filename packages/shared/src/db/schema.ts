import { sql } from "drizzle-orm";
import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import type { AdapterAccountType } from "next-auth/adapters"
import { S3_PROVIDERS } from "../utils";


// **************** POSTS ****************

export const post = sqliteTable("posts", {
    id: integer("id",{mode:'number'}).primaryKey({autoIncrement:true}),
    title: text("title").notNull(),
    body: text("body").notNull(),
    createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`)
});

// **************** S3_Connection ****************

export const s3_connections = sqliteTable("s3_connections", {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" }),
    provider : text("provider",{enum: S3_PROVIDERS}).notNull(),
});


// **************** S3_CONNECTION_ENTITY ****************

export const s3_connection_entity = sqliteTable("s3_connection_entity", {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    s3_connection_id: text("s3_connection_id").notNull().references(() => s3_connections.id, { onDelete: "cascade" }),
    created_at: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
    modified_at: text("modified_at").default(sql`(CURRENT_TIMESTAMP)`),
});

// **************** S3_CONNECTION_ATTRIBUTE ****************

export const s3_connection_attribute = sqliteTable("s3_connection_attribute", {
  id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
  s3_connection_entity_id: text("s3_connection_entity_id").notNull().references(() => s3_connection_entity.id, { onDelete: "cascade" }),
  attribute_name: text("attribute_name").notNull(),
});

// **************** S3_CONNECTION_ATTRIBUTE_VALUE ****************

export const s3_connection_attribute_value = sqliteTable("s3_connection_attribute_value", {
  id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
  s3_connection_attribute_id: text("s3_connection_attribute_id").notNull().references(() => s3_connection_attribute.id, { onDelete: "cascade" }),
  attribute_value: text("attribute_value").notNull(),
})

// **************** USER ****************

export const user = sqliteTable("user", {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
    image: text("image"),
  })
   
// **************** ACCOUNT ****************

export const account = sqliteTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)
 
// **************** SESSION ****************

export const sessions = sqliteTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
})
  
// **************** VERIFICATION_TOKEN ****************

export const verificationTokens = sqliteTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
)
   
// **************** AUTHENTICATOR ****************

export const authenticators = sqliteTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: integer("credentialBackedUp", {
      mode: "boolean",
    }).notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
)