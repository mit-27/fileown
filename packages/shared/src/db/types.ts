import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { post, user,s3_connections,s3_connection_entity,s3_connection_attribute,s3_connection_attribute_value } from './schema';
import * as schema from './schema';
import { LibSQLDatabase } from 'drizzle-orm/libsql';

export type DrizzleDB = LibSQLDatabase<typeof schema>;

export type User = InferSelectModel<typeof user>;
export type NewUser = InferInsertModel<typeof user>;

export type Post = InferSelectModel<typeof post>;
export type NewPost = InferInsertModel<typeof post>;

export type S3Connection = InferSelectModel<typeof s3_connections>;
export type NewS3Connection = InferInsertModel<typeof s3_connections>;

export type S3ConnectionEntity = InferSelectModel<typeof s3_connection_entity>;
export type NewS3ConnectionEntity = InferInsertModel<typeof s3_connection_entity>;

export type S3ConnectionAttribute = InferSelectModel<typeof s3_connection_attribute>;
export type NewS3ConnectionAttribute = InferInsertModel<typeof s3_connection_attribute>;

export type S3ConnectionAttributeValue = InferSelectModel<typeof s3_connection_attribute_value>;
export type NewS3ConnectionAttributeValue = InferInsertModel<typeof s3_connection_attribute_value>;