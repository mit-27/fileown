import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import 'dotenv/config';
import * as schema from "./schema";


console.log("DB URL : ", process.env.TURSO_DATABASE_URL)

const client = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_DATABASE_AUTH_TOKEN
});



export const db = drizzle(client, { schema });