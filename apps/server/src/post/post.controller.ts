import { Controller, Get, Post, Req, HttpCode, HttpStatus, Body, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
// import { CreatePostDto } from './dto/create-post.dto';
import { contract } from '@fileown/shared';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { AuthGuard } from 'src/core/auth/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('bearerAuth') // Use the scheme defined in Swagger config
@UseGuards(AuthGuard)
@Controller()
export class PostController {

    constructor(private readonly postService: PostService) { }

    @TsRestHandler(contract.posts)
    async postHandler() {
        return tsRestHandler(contract.posts, {
            getPosts: async () => {
                console.log("getPosts xzx");
                const posts = await this.postService.getPosts();
                if (!posts) {
                    return {
                        status: 400,
                        body: { message: "Failed to get posts" }
                    }
                }
                return {
                    status: 200,
                    body: posts
                }
            },
            createPost: async ({ body }) => {
                const createdPost = await this.postService.addPost(body);
                if (!createdPost) {
                    return {
                        status: 400,
                        body: { message: "Failed to get posts" }
                    }
                }
                return {
                    status: 200,
                    body: createdPost
                }
            },
            getPost: async ({ params }) => {
                const post = await this.postService.getPost(params.id);
                if (!post) {
                    return {
                        status: 400,
                        body: { message: "Failed to get post" }
                    }
                }
                return {
                    status: 200,
                    body: post
                }
            },
            updatePost: async ({ params, body }) => {
                const updatedPost = await this.postService.updatePost(params.id, body);
                if (!updatedPost) {
                    return {
                        status: 400,
                        body: { message: "Failed to update post" }
                    }
                }
                return {
                    status: 200,
                    body: updatedPost
                }

            },
            deletePost: async ({ params }) => {
                const deletedPost = await this.postService.deletePost(params.id);
                if (!deletedPost) {
                    return {
                        status: 400,
                        body: { message: "Failed to delete post" }
                    }
                }
                return {
                    status: 200,
                    body: deletedPost
                }
            },

        })

    }
} 