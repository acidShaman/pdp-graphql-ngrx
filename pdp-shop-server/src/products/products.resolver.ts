import { Resolver, Query, Args, Int, Mutation } from "@nestjs/graphql";
import { ProductsService } from "./products.service";
import { CreateProductInput, UpdateProductInput } from "./dtos/product.dto";
import { Product } from "./models/product";
import { UpdateResponse } from "src/shared/models/update-response";

@Resolver(of => Product)
export class ProductsResolver {
    constructor(
        private productsService: ProductsService,
    ) { }

    @Query(returns => [Product])
    async allProducts() {
        return this.productsService.findAll();
    }

    @Query(returns => [Product])
    async productsByCategoryId(@Args('id', { type: () => String }) id: string) {
        return this.productsService.findAllByCategoryId(id);
    }

    @Query(returns => Product)
    async product(@Args('id', { type: () => String }) id: string) {
        return this.productsService.findById(id);
    }

    @Mutation(returns => UpdateResponse)
    async updateProduct(@Args('product') product: UpdateProductInput) {
        await this.productsService.updateProduct(product);
        return new UpdateResponse();
    }

    @Mutation(returns => Product)
    async createProduct(@Args('product') product: CreateProductInput) {
        console.log('createProduct', product);
        return this.productsService.createProduct(product);
    }
}