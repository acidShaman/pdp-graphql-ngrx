import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { UpdateCategoryInput, CreateCategoryInput } from './dtos/category.dto';
import { Category } from './models/category';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>,
    ) { }

    findAll(): Promise<Category[]> {
        return this.categoriesRepository.find();
    }

    findById(id: string): Promise<Category | null> {
        return this.categoriesRepository.findOneBy({id});
    }

    async updateCategory(category: UpdateCategoryInput): Promise<UpdateResult> {
        const categoryToUpdate = await this.categoriesRepository.findOneBy({id:category.id});
        if (!categoryToUpdate) {
            throw new NotFoundException('Category not found');
        }
        return this.categoriesRepository.update(category.id, category);
    }

    createCategory(category: CreateCategoryInput): Promise<Category> {
        return this.categoriesRepository.save(category);
    }
}
