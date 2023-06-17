import { ObjectType, Field } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany } from "typeorm";
import { UserModel } from "./user";

@ObjectType()
@Entity()
export class ProductModel {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ length: 500, nullable: false })
    name: string;

    @Field()
    @Column('text', { nullable: false })
    description: string;

    @Field()
    @Column('varchar', { length: 15 })
    price: string;

    @Field(type => [UserModel], { nullable: true })
    @ManyToMany(type => UserModel, customer => customer.favorites)
    likedByUsers: UserModel[]

    @Field()
    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
}