import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAuthorInput {
    @Field({ nullable: true })
    firstname?: string;

    @Field({ nullable: true })
    lastName?: string;
}
