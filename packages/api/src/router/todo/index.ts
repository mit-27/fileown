
import { todo } from '@fileown/db/src/schema';
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from '../../trpc'

export const todoRouter = createTRPCRouter({
    getTodos: publicProcedure.query(async ({ ctx }) => {
        return await ctx.db.select().from(todo).all();
    }),
    addTodo: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
        await ctx.db.insert(todo).values({ content: input });
        return true;
    }),
})