import { Injectable } from '@nestjs/common';

import type { PageDto } from '../../common/dto/PageDto';
import { CategoryRepository } from './category.repository';
import type { CategoryAddDto } from './dto/CategoryAddDto';
import type { CategoryDto } from './dto/CategoryDto';

@Injectable()
export class CategoryService {
    constructor(public readonly categoryRepository: CategoryRepository) {}

    async getCategoryListWithTaxes(): Promise<PageDto<CategoryDto>> {
        const list = await this.categoryRepository.query(
            `SELECT category.id, category.name, tax.name as taxName
            FROM category
            LEFT JOIN tax ON category.tax_id = tax.Id
            ORDER BY category.created`,
        );
        return list;
    }

    async getCategoryList(): Promise<PageDto<CategoryDto>> {
        const list = await this.categoryRepository.query(
            'SELECT * FROM category',
        );
        return list;
    }

    async addCategory(categoryAddDto: CategoryAddDto): Promise<CategoryDto> {
        try {
            const category = await this.categoryRepository.query(
                'INSERT INTO category (name, tax_id) VALUES ($1, $2) RETURNING *',
                [categoryAddDto.name, categoryAddDto.taxId],
            );
            return category;
        } catch (e) {
            throw new Error(e);
        }
    }

    async removeCategory(categoryId: string): Promise<any> {
        try {
            return await this.categoryRepository.query(
                'DELETE FROM category WHERE id = $1',
                [categoryId],
            );
        } catch (e) {
            throw new Error(e);
        }
    }
}
