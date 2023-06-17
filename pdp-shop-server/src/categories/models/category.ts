import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { Product } from "../../products/models/product";
import { Field, Int, ObjectType } from '@nestjs/graphql';


@ObjectType()
@Entity()
export class Category {
    @Field(type => String)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(type => String)
    @Column('varchar',{ length: 500, nullable: false })
    name: string;

    @Field(type => String)
    @Column('text', { nullable: true })
    imageUrl: string;

    // @Field(type => [Product])
    @OneToMany(type => Product, product => product.category)
    products: Product;
    
    @Field(type => String)
    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Field(type => String)
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
}