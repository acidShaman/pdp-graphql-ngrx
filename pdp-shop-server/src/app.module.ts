import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { Category } from './categories/models/category';
import { Product } from './products/models/product';
import { User } from './users/models/user';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { Order } from './orders/models/order';

@Module({
    imports: [
        UsersModule,
        CategoriesModule,
        ProductsModule,
        OrdersModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: '127.0.0.1',
            port: 5432,
            username: 'postgres',
            password: 'postgres',
            database: 'shop',
            entities: [
                Category,
                Order,
                Product,
                User
            ],
            autoLoadEntities: true,
            synchronize: true,
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            include: [
                UsersModule,
                CategoriesModule,
                ProductsModule,
                OrdersModule
            ],
            driver: ApolloDriver,
            playground: true,
            autoSchemaFile: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
