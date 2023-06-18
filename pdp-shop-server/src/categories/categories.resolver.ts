import { Resolver, Query, Args, Int, Mutation } from "@nestjs/graphql";
import { CategoriesService } from "./categories.service";
import { UpdateResult } from "typeorm";
import { UpdateCategoryDTO, CreateCategoryDTO } from "./dtos/category.dto";
import { Category } from "./models/category";
import { UpdateResponse } from "src/shared/models/update-response";

@Resolver(of => Category)
export class CategoriesResolver {
    constructor(
        private categoriesService: CategoriesService,
    ) { }

    @Query(returns => [Category])
    async allCategories() {
        return this.categoriesService.findAll();
    }

    @Query(returns => Category)
    async category(@Args('id', { type: () => String }) id: string) {
        return this.categoriesService.findById(id);
    }

    @Mutation(returns => UpdateResponse)
    async updateCategory(@Args('category') category: UpdateCategoryDTO) {
        await this.categoriesService.updateCategory(category);
        return new UpdateResponse();
    }

    @Mutation(returns => Category)
    async createCategory(@Args('category') category: CreateCategoryDTO) {
        return this.categoriesService.createCategory(category);
    }
}