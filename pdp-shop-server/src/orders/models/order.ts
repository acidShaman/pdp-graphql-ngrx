import { OrderStatus } from "src/shared/enums/order-status";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from "src/users/models/user";
import { CreateOrderDTO, OrderPosition } from "../dtos/order.dto";
import GraphQLJSON from "graphql-type-json";
import { CreateCategoryDTO } from "src/categories/dtos/category.dto";

@ObjectType()
@Entity()
export class Order {
    @Field(type => String)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => OrderStatus)
    @Column({
        type: "enum",
        enum: OrderStatus,
        default: OrderStatus.NEW
    })
    status: OrderStatus;

    @Field(type => String)
    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Field(type => String)
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @Field(type => Int)
    @Column('int', {
        default: 0
    })
    totalPrice: number;

    @Field(type => String)
    @Column('text')
    address: string;

    @Field(type => User)
    @ManyToOne(() => User, (user: User) => user.orders)
    customer: User;

    @Field(type => String)
    @Column({
        name: 'customerId',
        nullable: false,
        type: 'uuid',
    })
    customerId: string;

    @Field(type => GraphQLJSON)
    @Column('json', {
        nullable: true,
    })
    positions: JSON;
}