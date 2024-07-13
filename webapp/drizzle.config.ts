import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

export default defineConfig({
    dialect: "sqlite", // "mysql" | "sqlite" | "postgresql"
    schema: "./src/db/schema/*",
    driver: 'turso',
    dbCredentials: {
        url: process.env.TURSO_DATABSE_URL!,
        authToken: process.env.TURSO_DATABASE_AUTH_TOKEN
    },
    out: "./drizzle",
});