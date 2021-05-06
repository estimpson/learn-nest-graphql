import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
    @Field((type) => Int)
    authorId: number;

    @Field()
    title: string;
}
