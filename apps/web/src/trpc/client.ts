import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@fileown/api";

export const api = createTRPCReact<AppRouter>({});