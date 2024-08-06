import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter } from "@fileown/api/src/root";
import { createTRPCContext } from "@fileown/api";
import { NextRequest } from "next/server";

const handler = (req: NextRequest) =>
    fetchRequestHandler({
        endpoint: "/api/trpc",
        req: req,
        router: appRouter,
        createContext: () => createTRPCContext({ req })
    });

export { handler as GET, handler as POST };