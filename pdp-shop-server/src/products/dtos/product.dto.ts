import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateProductInput {
    @Field()
    name: string;

    @Field()
    categoryId: string;

    @Field()
    imageUrl: string = '';

    @Field()
    description: string = '';

    @Field()
    price: string = '0';

    @Field()
    active: boolean = true;

    @Field(() => [String])
    sizes: string[] = [];

    @Field(() => [String])
    colors: string[] = [];
}

@InputType()
export class UpdateProductInput {
    @Field()
    id: string;

    @Field()
    name: string;
    
    @Field()
    categoryId: string;

    @Field()
    imageUrl: string = '';

    @Field()
    description: string = '';

    @Field()
    price: string = '0';

    @Field()
    active: boolean = true;

    @Field(() => [String])
    sizes?: string[];

    @Field(() => [String])
    colors?: string[];
}