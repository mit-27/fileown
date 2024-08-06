"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React, { useState } from "react";
import superjson from "superjson";

import { api } from "./client";

const getBaseUrl = () => {
    if (typeof window !== "undefined") return "";
    const vc = process.env.VERCEL_URL;
    if (vc) return `https://${vc}`;
    return "http://localhost:3000";
  };

export default function Provider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({}));
    const [trpcClient] = useState(() =>
        api.createClient({
            links: [
                httpBatchLink({
                    transformer: superjson,
                    url: `${getBaseUrl()}/api/trpc`,
                }),
            ],
        })
    );
    return (
        <api.Provider client= { trpcClient } queryClient = { queryClient } >
            <QueryClientProvider client={ queryClient }> { children } </QueryClientProvider>
        </api.Provider>
  );
}