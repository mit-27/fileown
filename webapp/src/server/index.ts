import { router, publicProcedure } from './trpc';

export const appRouter = router({
    // ...
    getTodos: publicProcedure.query(async () => {
        return [10, 20]
    })
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;