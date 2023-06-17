import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany, ManyToOne } from "typeorm";
import { User } from "../../users/models/user";
import { Category } from "../../categories/models/category";
import { Field, Int, ObjectType } from '@nestjs/graphql';


@ObjectType()
@Entity()
export class Product {
    @Field(type => String)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(type => String)
    @Column('varchar', { length: 500, nullable: false })
    name: string;

    @Field(type => String)
    @Column('varchar', { length: 500, nullable: true })
    imageUrl: string;

    @Field(type => String)
    @Column('text', { nullable: true })
    description: string;

    @Field(type => String)
    @Column('varchar', { length: 50, nullable: false, default: '0' })
    price: string;

    @Field(type => Boolean)
    @Column('boolean', { default: false })
    active: boolean;

    @Field(type => [String])
    @Column('simple-array', { nullable: true })
    sizes: string[];

    @Field(type => [String])
    @Column('simple-array', { nullable: true })
    colors: string[];

    @Field(type => String)
    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Field(type => String)
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @Field(type => String)
    @Column({
        name: 'categoryId',
        nullable: true,
        type: 'uuid',
        default: null
    })
    categoryId: string;

    @ManyToOne(type => Category, category => category.products)
    category: Category;

    @ManyToMany(type => User, user => user.favorites)
    likedByUsers: User[];
}