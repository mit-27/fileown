import { initContract } from '@ts-rest/core';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { user } from '../../db/schema';

const c = initContract();

const UserSchema = createSelectSchema(user)

const ErrorSchema = z.object({
    message: z.string(),
});

export const userContract = c.router(
    {
        login: {
            method: 'GET',
            path: '/auth/login',
            responses: {
                201: UserSchema,
                400: ErrorSchema,
            },
            summary: 'Login the user',

        },
        // getPosts: {
        //     method: 'GET',
        //     path: `/posts`,
        //     responses: {
        //         200: PostSchema.array(),
        //         400: ErrorSchema,
        //     },
        //     summary: 'Get All Posts',
        // },
        // getPost: {
        //     method: 'GET',
        //     path: '/posts/:id',
        //     pathParams: z.object({
        //         id: z.string().uuid(),
        //     }),
        //     responses: {
        //         200: PostSchema,
        //         400: ErrorSchema,
        //     },
        //     summary: 'Get a post by id',
        // }
    }
)