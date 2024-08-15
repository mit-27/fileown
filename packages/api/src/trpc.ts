import { TRPCError, type inferAsyncReturnType, initTRPC } from "@trpc/server";
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import superjson from "superjson";
import { ZodError } from "zod";
import { db } from '@fileown/db';
import { NextRequest } from "next/server";
import { getAuth } from '@clerk/nextjs/server'
// Creating Context 

interface CreateInnerContextOptions extends Partial<CreateNextContextOptions> {
}

export async function createContextInner(opts?: CreateInnerContextOptions) {
    return {
        db,
    };
}

export const createTRPCContext = async (opts: { req: NextRequest, serverSideCall?: boolean }) => {
    const contextInner = await createContextInner();
    return {
        ...contextInner,
        req: opts.req,
        auth: getAuth(opts?.req)
    };
}


export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

export const t = initTRPC.context<typeof createTRPCContext>().create({
    transformer: superjson,
    errorFormatter({ shape, error }) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError:
                    error.cause instanceof ZodError ? error.cause.flatten() : null,
            },
        };
    },
});


export const createTRPCRouter = t.router;
export const mergeRouters = t.mergeRouters;
export const publicProcedure = t.procedure;

const isAuthed = t.middleware(({ next, ctx }) => {
    if (!ctx.auth.userId) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
    }
    return next({
        ctx: {
            auth: ctx.auth,
        },
    })
})

export const protectedProcedure = t.procedure.use(isAuthed)