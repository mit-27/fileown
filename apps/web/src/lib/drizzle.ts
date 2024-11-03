import {schema} from '@fileown/shared'
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client/web';


console.log(process.env.DB_FILE_NAME);
const client = createClient({ url: process.env.DB_FILE_NAME!,authToken: '' });


export const db = drizzle(client,{schema});