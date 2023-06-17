import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateCategoryInput {
    @Field()
    name: string;

    @Field()
    imageUrl?: string = '';
}

@InputType()
export class UpdateCategoryInput {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    imageUrl?: string = '';
}