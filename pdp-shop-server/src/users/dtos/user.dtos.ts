import { Field, InputType } from "@nestjs/graphql";
import { UserRole } from "src/shared/enums/role";

@InputType()
export class CreateUserInput {
    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    address: string;

    @Field()
    password: string;

    @Field()
    phone: string;

    @Field(() => UserRole)
    role?: UserRole;

    @Field()
    imageUrl?: string = '';
}

@InputType()
export class UpdateUserInput {
    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    address: string;

    @Field()
    password: string;

    @Field()
    phone: string;

    @Field()
    birthDate: string;

    @Field(() => UserRole)
    role: UserRole;

    @Field()
    imageUrl: string = '';

    @Field()
    active: boolean = true;

    @Field(() => [String])
    sizes: string[] = [];

    @Field(() => [String])
    colors: string[] = [];
}