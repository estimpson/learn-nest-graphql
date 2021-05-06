import { Injectable } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreatePostInput } from './dto/create-post-input';
import { FindPostsInput } from './dto/find-posts-input';
import { PostUpdateDto as UpdatePostInput } from './dto/update-post.inputs';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
    private postId = 0;
    constructor(private readonly authorsService: AuthorsService) {}

    findPosts(findPostsInput: FindPostsInput): Post[] {
        const author = this.authorsService.findOneById(findPostsInput.authorId);
        return author.posts;
    }

    create(createPostInput: CreatePostInput) {
        const author = this.authorsService.findOneById(
            createPostInput.authorId,
        );
        const post = new Post();
        post.id = this.postId++;
        post.title = createPostInput.title;
        author.posts.push(post);
    }

    upvoteById(updatePostInput: UpdatePostInput) {
        const post = this.authorsService
            .findAll()
            .find((author) =>
                author.posts.findIndex(
                    (post) => post.id === updatePostInput.id,
                ),
            )
            ?.posts?.find((post) => post.id === updatePostInput.id);

        post.votes = post.votes ?? 0 + 1;
    }
}
