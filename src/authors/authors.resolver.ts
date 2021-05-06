import {
    Resolver,
    Query,
    Mutation,
    Args,
    Int,
    ResolveField,
    Parent,
} from '@nestjs/graphql';
import { AuthorsService } from './authors.service';
import { Author } from './entities/author.entity';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';

@Resolver(() => Author)
export class AuthorsResolver {
    constructor(
        private readonly authorsService: AuthorsService,
        private readonly postsService: PostsService,
    ) {}

    @Query(() => Author, {
        name: 'author',
        description: 'Pass an id, get back an author',
    })
    async getAuthor(
        @Args('id', { type: () => Int, description: `The author's id` })
        id: number,
    ) {
        return this.authorsService.findOneById(id);
    }

    @Query(() => [Author], { name: 'authors' })
    async findAll() {
        return this.authorsService.findAll();
    }

    @ResolveField('posts', (returns) => [Post])
    async getPosts(@Parent() author: Author) {
        const { id } = author;
        return this.postsService.findPosts({ authorId: id });
    }

    @Mutation(() => Author)
    async createAuthor(
        @Args('createAuthorInput') createAuthorInput: CreateAuthorInput,
    ) {
        return this.authorsService.create(createAuthorInput);
    }

    @Mutation(() => Author)
    async updateAuthor(
        @Args('updateAuthorInput') updateAuthorInput: UpdateAuthorInput,
    ) {
        return this.authorsService.update(
            updateAuthorInput.id,
            updateAuthorInput,
        );
    }

    @Mutation(() => Author)
    async removeAuthor(@Args('id', { type: () => Int }) id: number) {
        return this.authorsService.remove(id);
    }

    @Mutation((returns) => Post)
    async upvotePost(
        @Args({ name: 'postId', type: () => Int }) postId: number,
    ) {
        return this.postsService.upvoteById({ id: postId });
    }
}
