import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class CreateOrderDTO {
    @Field(type => String)
    address?: string = 'unknown';

    @Field(type => String)
    customerId?: string;

    @Field(type => [OrderPosition])
    positions: OrderPosition[];

    @Field(type => Int)
    totalPrice?: number = 0;
}

@InputType()
export class OrderPosition {
    @Field(type => String)
    size: string;

    @Field(type => String)
    color: string;

    @Field(type => String)
    productId: string;

    @Field(type => Int)
    price: number;
}


@InputType()
export class CreateOrderPositionDTO {
    @Field(type => String)
    size: string;

    @Field(type => String)
    color: string;

    @Field(type => String)
    productId: string;
}