import { ObjectType, Field } from "@nestjs/graphql";
import { Role } from "src/enums/role";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany } from "typeorm";
import { ProductModel } from "./product";

@ObjectType()
@Entity()
export class UserModel {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({
      type: "enum",
      enum: Role,
      default: Role.CUSTOMER
    })
    role: Role;

    @Field()
    @Column({ length: 500, nullable: false })
    name: string;

    @Field()
    @Column('text', { nullable: false })
    email: string;

    @Field()
    @Column('varchar', { length: 15 })
    phone: string;

    @Field()
    @Column('text')
    address: string;

    @Field(type => [ProductModel], { nullable: true })
    @ManyToMany(type => ProductModel, product => product.likedByUsers)
    favorites: ProductModel[]

    @Field()
    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

}