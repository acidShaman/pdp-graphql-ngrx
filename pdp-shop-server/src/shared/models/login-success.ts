import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class LoginSuccessDTO{
    @Field(type => String)
    token: string;
}