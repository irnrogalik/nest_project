import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import type { PageOptionsDto } from '../../common/dto/PageOptionsDto';
import { paginate } from '../../shared/functions';
import { CategoryEntity } from './category.entity';
import type { CategoryAddDto } from './dto/CategoryAddDto';
import { CategoryListWithTaxesDto } from './dto/CategoryListWithTaxesDto';

@EntityRepository(CategoryEntity)
export class CategoryRepository extends Repository<CategoryEntity> {
    async getCategoryListWithTaxes(
        pageOptions: PageOptionsDto,
    ): Promise<CategoryListWithTaxesDto[]> {
        const categoryList: CategoryListWithTaxesDto[] = await this.query(
            paginate(
                `SELECT category.id, category.name, tax.name as taxName
            FROM category
            LEFT JOIN tax ON category.tax_id = tax.Id
            ORDER BY category.created_at`,
                pageOptions,
            ),
        );
        return plainToInstance(CategoryListWithTaxesDto, categoryList);
    }

    async getCategoryList(): Promise<CategoryEntity[]> {
        const categories: CategoryEntity[] = await this.query(
            'SELECT * FROM category',
        );
        return plainToInstance(CategoryEntity, categories);
    }

    async addCategory(categoryAddDto: CategoryAddDto): Promise<CategoryEntity> {
        const category: CategoryEntity[] = await this.query(
            'INSERT INTO category (name, tax_id) VALUES ($1, $2) RETURNING *',
            [categoryAddDto.name, categoryAddDto.taxId],
        );
        return plainToInstance(CategoryEntity, category[0]);
    }

    async removeCategory(categoryId: string): Promise<boolean> {
        const result: [
            [],
            boolean,
        ] = await this.query('DELETE FROM category WHERE id = $1', [
            categoryId,
        ]);
        return result[1];
    }
}
