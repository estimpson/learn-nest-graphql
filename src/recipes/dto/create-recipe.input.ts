import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class CreateRecipeInput {
    @Field()
    @MaxLength(30)
    title: string;

    @Field({ nullable: true })
    @IsOptional()
    @Length(30, 255)
    description?: string;

    @Field((type) => [String])
    ingredient: string[];
}
