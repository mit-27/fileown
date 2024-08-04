import { defineConfig } from "drizzle-kit";
import 'dotenv/config';


export default defineConfig({
    dialect: "sqlite", // "mysql" | "sqlite" | "postgresql"
    schema: "./src/schema/index.ts",
    driver: 'turso',
    dbCredentials: {
        url: process.env.TURSO_DATABASE_URL!,
        authToken: process.env.TURSO_DATABASE_AUTH_TOKEN
    },
    out: "./drizzle",
    verbose: true,
    strict: true
});