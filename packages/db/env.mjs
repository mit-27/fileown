import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
    server: {
        TURSO_DATABASE_URL: z.string().min(1),
        TURSO_DATABASE_AUTH_TOKEN: z.string().min(1),
    },
    runtimeEnv: {
        TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL,
        TURSO_DATABASE_AUTH_TOKEN: process.env.TURSO_DATABASE_AUTH_TOKEN,
    },
    skipValidation: true,
});
