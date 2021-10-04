import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import type { CategoryEntity } from './category.entity';
import { CategoryRepository } from './category.repository';
import type { CategoryAddDto } from './dto/CategoryAddDto';
import type { CategoryDto } from './dto/CategoryDto';
import type { CategoryListWithTaxesDto } from './dto/CategoryListWithTaxesDto';

@Injectable()
export class CategoryService {
    constructor(public readonly categoryRepository: CategoryRepository) {}

    async getCategoryListWithTaxes(): Promise<CategoryListWithTaxesDto[]> {
        try {
            return await this.categoryRepository.getCategoryListWithTaxes();
        } catch (e) {
            throw new Error(e);
        }
    }

    async getCategoryList(): Promise<CategoryDto[]> {
        try {
            const categories: CategoryEntity[] = await this.categoryRepository.getCategoryList();
            return categories.toDtos();
        } catch (e) {
            throw new Error(e);
        }
    }

    async addCategory(categoryAddDto: CategoryAddDto): Promise<CategoryDto> {
        const category: CategoryEntity = await this.categoryRepository.addCategory(
            categoryAddDto,
        );
        if (!category) {
            throw new BadRequestException(
                `The category ${categoryAddDto.name} was not created`,
            );
        }
        return category.toDto();
    }

    async removeCategory(categoryId: string): Promise<void> {
        if (!(await this.categoryRepository.removeCategory(categoryId))) {
            throw new NotFoundException(
                `The category with id ${categoryId} not found.`,
            );
        }
    }
}
