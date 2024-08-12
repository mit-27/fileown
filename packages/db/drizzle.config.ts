import { defineConfig } from "drizzle-kit";
import { env } from "./env.mjs";

export default defineConfig({
    dialect: "sqlite", // "mysql" | "sqlite" | "postgresql"
    schema: "./src/schema/index.ts",
    driver: 'turso',
    dbCredentials: {
        url: env.TURSO_DATABASE_URL!,
        authToken: env.TURSO_DATABASE_AUTH_TOKEN
    },
    out: "./drizzle",
    verbose: true,
    strict: true
});