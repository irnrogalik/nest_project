import { Injectable } from '@nestjs/common';

import type { CategoryEntity } from './category.entity';
import { CategoryRepository } from './category.repository';
import type { CategoryAddDto } from './dto/CategoryAddDto';
import type { CategoryDto } from './dto/CategoryDto';

@Injectable()
export class CategoryService {
    constructor(public readonly categoryRepository: CategoryRepository) {}

    async getCategoryListWithTaxes(): Promise<CategoryEntity[]> {
        try {
            return await this.categoryRepository.getCategoryListWithTaxes();
        } catch (e) {
            throw new Error(e);
        }
    }

    async getCategoryList(): Promise<CategoryDto[]> {
        try {
            return await this.categoryRepository.getCategoryList();
        } catch (e) {
            throw new Error(e);
        }
    }

    async addCategory(categoryAddDto: CategoryAddDto): Promise<CategoryDto> {
        try {
            return await this.categoryRepository.addCategory(categoryAddDto);
        } catch (e) {
            throw new Error(e);
        }
    }

    async removeCategory(categoryId: string): Promise<any> {
        try {
            return await this.categoryRepository.removeCategory(categoryId);
        } catch (e) {
            throw new Error(e);
        }
    }
}
