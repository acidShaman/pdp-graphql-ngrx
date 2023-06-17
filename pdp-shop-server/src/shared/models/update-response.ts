import { ObjectType, Field } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Product } from "../../products/models/product";

@ObjectType()
export class UpdateResponse {
    @Field(type => Boolean)
    success: boolean = true;
}