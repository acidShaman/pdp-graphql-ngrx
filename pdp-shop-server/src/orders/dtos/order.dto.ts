import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateOrderInput {
    @Field(type => String)
    address: string;

    @Field(type => String)
    customerId: string;

    @Field(type => [OrderPosition])
    positions: OrderPosition[]
}

@InputType()
export class OrderPosition {
    @Field(type => String)
    size: string;

    @Field(type => String)
    color: string;

    @Field(type => String)
    productId: string;

    @Field(type => String)
    price: string;
}


@InputType()
export class CreateOrderPositionInput {
    @Field(type => String)
    size: string;

    @Field(type => String)
    color: string;

    @Field(type => String)
    productId: string;
}