import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class FindPostsInput {
    @Field((type) => Int)
    authorId: number;
}
