import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { env } from "../env.mjs";
import * as schema from "./schema";


console.log("DB URL : ", env.TURSO_DATABASE_URL)

const client = createClient({
    url: env.TURSO_DATABASE_URL!,
    authToken: env.TURSO_DATABASE_AUTH_TOKEN
});



export const db = drizzle(client, { schema });