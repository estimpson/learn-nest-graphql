import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PostUpdateDto {
    @Field(() => Int)
    id: number;
}
