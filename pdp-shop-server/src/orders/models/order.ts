import { OrderStatus } from "src/shared/enums/order-status";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from "src/users/models/user";
import { OrderPosition } from "../dtos/order.dto";

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

    @Field(type => String)
    @Column('varchar', { length: 30 })
    totalPrice: string;

    @Field(type => String)
    @Column('text')
    address: string;

    @OneToMany(type => User, user => user.orders)
    customer: User;

    @Field(type => String)
    @Column({
        name: 'customerId',
        nullable: false,
        type: 'uuid',
    })
    customerId: string;

    @Field(type => String, { nullable: true })
    @Column('jsonb', { nullable: true })
    positions: OrderPosition[];
}