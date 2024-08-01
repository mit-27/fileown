import { db } from '@/db';
import { router, publicProcedure } from './trpc';
import { TodoTable } from '@/db/schema/Finstances';
import { z } from 'zod'
import { ListObjectsV2Command, PutObjectCommand } from '@aws-sdk/client-s3';
import { r2 } from '@/lib/r2';

export const appRouter = router({
    // ...
    getTodos: publicProcedure.query(async () => {
        return await db.select().from(TodoTable).all();
    }),
    addTodo: publicProcedure.input(z.string()).mutation(async (opts) => {
        await db.insert(TodoTable).values({ content: opts.input });
        return true;
    }),
    uploadFile: publicProcedure.input(z.object({
        fileName: z.string(),
        fileContent: z.string()
    })).mutation(async (opts) => {

        const { fileName, fileContent } = opts.input;
        const command = new PutObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: `Mit/${fileName}`,
            Body: fileContent
        })

        const response = await r2.send(command);

        return true;

    }),
    getFileStruct: publicProcedure.input(z.string()).mutation(async (opts) => {
        const command = new ListObjectsV2Command({
            Bucket: process.env.R2_BUCKET_NAME,
            Prefix: opts.input
        });

        const response = await r2.send(command);

        return response.Contents;
    })

});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;