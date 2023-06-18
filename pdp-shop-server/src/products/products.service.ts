import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { UpdateProductDTO, CreateProductDTO, AddToFavoritesDTO } from './dtos/product.dto';
import { Product } from './models/product';
import { CategoriesService } from 'src/categories/categories.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/models/user';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
        private categoriesService: CategoriesService,
        private dataSource: DataSource,
    ) { }

    findAll(): Promise<Product[]> {
        return this.productsRepository.find();
    }

    findById(id: string): Promise<Product | null> {
        return this.productsRepository.findOneBy({ id });
    }

    async findAllByCategoryId(categoryId: string): Promise<Product[]> {
        if (!await this.categoriesService.findById(categoryId)) {
            throw new NotFoundException('Category not found')
        }
        return this.productsRepository.find({ where: { categoryId } });
    }



    async updateProduct(product: UpdateProductDTO): Promise<UpdateResult> {
        const productToUpdate = await this.productsRepository.findOneBy({ id: product.id });
        if (!productToUpdate) {
            throw new NotFoundException('Product not found');
        }
        return this.productsRepository.update(product.id, product);
    }

    createProduct(product: CreateProductDTO): Promise<Product> {
        return this.productsRepository.save(product);
    }

    async addToFavorites({ productId, userId }: AddToFavoritesDTO): Promise<[Product, User]> {
        const product = await this.dataSource.getRepository(Product).findOne({
            relations: {
                likedByUsers: true
            }, where: { id: productId }
        });
        const user = await this.dataSource.getRepository(User).findOne({
            relations: {
                favorites: true
            }, where: { id: userId }
        });
        if (!product || !user) {
            throw new NotFoundException('Product or user not found');
        }
        product.likedByUsers.push(user);
        user.favorites.push(product);
        return Promise.all([
            this.dataSource.manager.save(product),
            this.dataSource.manager.save(user)
        ])
    }
}
