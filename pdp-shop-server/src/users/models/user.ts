import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany, ManyToOne, BeforeInsert, BeforeUpdate } from "typeorm";
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
    password: string;

    @Field(type => String)
    @Column('text', { nullable: false })
    address: string;

    @Field(type => String)
    @Column('text', { nullable: false })
    imageUrl: string;

    @Field(type => [Product])
    @ManyToMany(type => Product, product => product.likedByUsers)
    favorites: Product[];

    @Field(type => [Order])
    @ManyToOne(type => Order, order => order.customer)
    orders: Order[];

    @Field(type => String)
    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Field(type => String)
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            const saltRounds = 10;
            this.password = await bcrypt.hash(this.password, saltRounds);
        }
    }

    @BeforeInsert()
    @BeforeUpdate()
    parseDate() {
        if (this.birthDate) {
            this.birthDate = new Date(this.birthDate);
        }
    }
}