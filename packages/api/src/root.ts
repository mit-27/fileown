import { todoRouter } from './router/todo'
import { createTRPCRouter } from './trpc'


export const appRouter = createTRPCRouter({
    todo: todoRouter
});


export type AppRouter = typeof appRouter;