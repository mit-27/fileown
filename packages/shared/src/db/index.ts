// import { drizzle } from 'drizzle-orm/postgres-js';
// import postgres from 'postgres';
// import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
// import { Pool } from "pg";
import * as dotenv from 'dotenv';
import * as schema from './schema';
import { drizzle, LibSQLDatabase } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
dotenv.config();

const client = createClient({ url: process.env.DB_FILE_NAME! });
export const db = drizzle(client, { schema }) as LibSQLDatabase<typeof schema>;



// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
// });




// export const db = drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;




