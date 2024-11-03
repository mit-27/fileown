import { initContract } from '@ts-rest/core';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { post } from '../../db/schema';

const c = initContract();

const PostSchema = createSelectSchema(post);

const ErrorSchema = z.object({
    message: z.string(),
});

export const postContract = c.router(
    {
        createPost: {
            method: 'POST',
            path: '/posts',
            responses: {
                200: PostSchema,
                400: ErrorSchema,
            },
            body: PostSchema.omit({ id: true,createdAt:true,updatedAt:true }),
            summary: 'Create a post',
        },
        getPosts: {
            method: 'GET',
            path: `/posts`,
            responses: {
                200: PostSchema.array(),
                400: ErrorSchema,
            },
            summary: 'Get All Posts',
        },
        getPost: {
            method: 'GET',
            path: '/posts/:id',
            pathParams: z.object({
                id: z.number(),
            }),
            responses: {
                200: PostSchema,
                400: ErrorSchema,
            },
            summary: 'Get a post by id',
        },
        updatePost: {
            method: 'PUT',
            path: '/posts/:id',
            pathParams: z.object({
                id: z.number(),
            }),
            body: PostSchema.omit({ id: true }),
            responses: {
                200: PostSchema,
                400: ErrorSchema,
            },
            summary: 'Update a post by id',
        },
        deletePost: {
            method: 'DELETE',
            path: '/posts/:id',
            pathParams: z.object({
                id: z.number(),
            }),
            body: z.any(),
            responses: {
                200: PostSchema,
                400: ErrorSchema,
            },
            summary: 'Delete a post by id',
        }
    }
)