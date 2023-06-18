import { Field, InputType } from "@nestjs/graphql";
import { UserRole } from "src/shared/enums/role";

@InputType()
export class CreateUserDTO {
    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    address: string;

    @Field()
    pass: string;

    @Field()
    phone: string;

    @Field(() => UserRole)
    role?: UserRole;

    @Field()
    imageUrl?: string = '';
}

@InputType()
export class LoginDTO {
    @Field()
    email: string;

    @Field()
    pass: string;
}

@InputType()
export class UpdateUserDTO {
    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    address: string;

    @Field()
    pass: string;

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