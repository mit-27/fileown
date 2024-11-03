import * as dotenv from 'dotenv';
import * as schema from './schema';
import { drizzle, LibSQLDatabase } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
dotenv.config();

const client = createClient({ url: process.env.DB_FILE_NAME! });
export const db = drizzle(client, { schema }) as LibSQLDatabase<typeof schema>;


