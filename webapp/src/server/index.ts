import { db } from '@/db';
import { router, publicProcedure } from './trpc';
import { TodoTable } from '@/db/schema/Finstances';
import { z } from 'zod'

export const appRouter = router({
    // ...
    getTodos: publicProcedure.query(async () => {
        return await db.select().from(TodoTable).all();
    }),
    addTodo: publicProcedure.input(z.string()).mutation(async (opts) => {
        await db.insert(TodoTable).values({ content: opts.input });
        return true;
    })

});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;