import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const client = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_DATABASE_AUTH_TOKEN
});

export const db = drizzle(client);