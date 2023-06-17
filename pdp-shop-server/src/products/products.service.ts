import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { UpdateProductInput, CreateProductInput } from './dtos/product.dto';
import { Product } from './models/product';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
        private categoriesService: CategoriesService
    ) { }

    findAll(): Promise<Product[]> {
        return this.productsRepository.find();
    }

    findById(id: string): Promise<Product | null> {
        return this.productsRepository.findOneBy({id});
    }

    async findAllByCategoryId(categoryId: string): Promise<Product[]> {
        if (!await this.categoriesService.findById(categoryId)) {
            throw new NotFoundException('Category not found')
        }
        return this.productsRepository.find({where: {categoryId}});
    }



    async updateProduct(product: UpdateProductInput): Promise<UpdateResult> {
        const productToUpdate = await this.productsRepository.findOneBy({id:product.id});
        if (!productToUpdate) {
            throw new NotFoundException('Product not found');
        }
        return this.productsRepository.update(product.id, product);
    }

    createProduct(product: CreateProductInput): Promise<Product> {
        return this.productsRepository.save(product);
    }
}
