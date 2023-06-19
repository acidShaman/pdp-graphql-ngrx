import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany, ManyToOne, BeforeInsert, BeforeUpdate, JoinTable } from "typeorm";
import { Product } from "../../products/models/product";
import { Order } from "src/orders/models/order";
import { Field, Int, ObjectType } from "@nestjs/graphql";
import * as bcrypt from 'bcrypt';
import { UserRole } from "src/shared/enums/role";


@ObjectType()
@Entity()
export class User {
    @Field(type => String)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(type => String)
    @Column('varchar', { length: 100, nullable: false })
    name: string;

    @Field(type => String)
    @Column('varchar', { length: 100, nullable: false, })
    email: string;

    @Field(() => UserRole)
    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.CUSTOMER
    })
    role: UserRole;

    @Field(type => Int)
    @Column('int', {
        nullable: false,
        default: 0
    })
    balance: number;

    @Field(type => String)
    @Column('varchar', { length: 30 })
    phone: string;

    @Field(type => String)
    @Column('varchar', { length: 2000 })
    pass: string;

    @Field(type => String)
    @Column('text', { nullable: false })
    address: string;

    @Field(type => String)
    @Column('text', { nullable: false })
    imageUrl: string;

    @Field(type => [Product], {nullable: true})
    @ManyToMany(
        type => Product, 
        product => product.likedByUsers
    )
    @JoinTable({
        name: 'users_products_favorites',
    })
    favorites?: Product[];

    @Field(type => [Order], {nullable: true})
    @OneToMany(
        type => Order, 
        order => order.customer
    )
    orders?: Order[];

    @Field(type => String)
    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Field(type => String)
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
}

@ObjectType()
export class UserWithToken extends User {
    @Field(type => String)
    token: string;
}