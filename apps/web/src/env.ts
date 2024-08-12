import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

import "@fileown/db/env.mjs";

export const env = createEnv({
    server: {

    },
    client: {

    },
    runtimeEnv: {
    },
    skipValidation: true,
});
