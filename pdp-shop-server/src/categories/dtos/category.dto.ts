import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateCategoryDTO {
    @Field()
    name: string;

    @Field()
    imageUrl?: string = '';
}

@InputType()
export class UpdateCategoryDTO {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    imageUrl?: string = '';
}