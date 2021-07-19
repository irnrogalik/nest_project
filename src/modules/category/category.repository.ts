import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { CategoryEntity } from './category.entity';
import type { CategoryAddDto } from './dto/CategoryAddDto';

@EntityRepository(CategoryEntity)
export class CategoryRepository extends Repository<CategoryEntity> {
    getCategoryListWithTaxes(): Promise<CategoryEntity[]> {
        return this.query(
            `SELECT category.id, category.name, tax.name as taxName
            FROM category
            LEFT JOIN tax ON category.tax_id = tax.Id
            ORDER BY category.created_at`,
        );
    }

    getCategoryList(): Promise<CategoryEntity[]> {
        return this.query('SELECT * FROM category');
    }

    addCategory(categoryAddDto: CategoryAddDto): Promise<CategoryEntity> {
        return this.query(
            'INSERT INTO category (name, tax_id) VALUES ($1, $2) RETURNING *',
            [categoryAddDto.name, categoryAddDto.taxId],
        );
    }

    async removeCategory(categoryId: string): Promise<any> {
        return this.query('DELETE FROM category WHERE id = $1', [categoryId]);
    }
}
