import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from './post.entity';

@ObjectType()
export class Author {
    @Field((type) => Int)
    id: number;

    @Field({ nullable: true })
    firstname?: string;

    @Field({ nullable: true })
    lastName?: string;

    @Field((type) => [Post])
    posts: Post[];
}
