import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateProductDTO {
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
export class UpdateProductDTO {
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

@InputType()
export class AddToFavoritesDTO {
    @Field()
    productId: string;

    @Field()
    userId: string;
}