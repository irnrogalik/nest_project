import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import type { PageOptionsDto } from '../../common/dto/PageOptionsDto';
import type { CategoryEntity } from './category.entity';
import { CategoryRepository } from './category.repository';
import type { CategoryAddDto } from './dto/CategoryAddDto';
import type { CategoryDto } from './dto/CategoryDto';
import type { CategoryListWithTaxesDto } from './dto/CategoryListWithTaxesDto';

@Injectable()
export class CategoryService {
    constructor(public readonly categoryRepository: CategoryRepository) {}

    async getCategoryListWithTaxes(
        pageOptions: PageOptionsDto,
    ): Promise<CategoryListWithTaxesDto[]> {
        const getCategoryListWithTaxes: CategoryListWithTaxesDto[] = await this.categoryRepository.getCategoryListWithTaxes(
            pageOptions,
        );
        return getCategoryListWithTaxes;
    }

    async getCategoryList(): Promise<CategoryDto[]> {
        const categories: CategoryEntity[] = await this.categoryRepository.getCategoryList();
        return categories.toDtos();
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

    async removeCategory(categoryId: string): Promise<boolean> {
        if (!(await this.categoryRepository.removeCategory(categoryId))) {
            throw new NotFoundException(
                `The category with id ${categoryId} not found.`,
            );
        }
        return true;
    }
}
