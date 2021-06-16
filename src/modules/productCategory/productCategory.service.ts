import { Injectable } from '@nestjs/common';

import type { PageDto } from '../../common/dto/PageDto';
import type { ProductCategoryAddDto } from './dto/ProductCategoryAddDto';
import type { ProductCategoryDto } from './dto/ProductCategoryDto';
import { ProductCategoryDtoRepository } from './productCategory.repository';

@Injectable()
export class ProductCategoryService {
    constructor(
        public readonly productCategoryDtoRepository: ProductCategoryDtoRepository,
    ) {}

    async getProductCategoryList(): Promise<PageDto<ProductCategoryDto>> {
        const list = await this.productCategoryDtoRepository.query(
            `SELECT product.id AS productId, product.name AS productName,
                array_agg(category.id) AS categoryId, array_agg(category.name) AS categoryName
            FROM product_category
            LEFT JOIN product ON product.id = product_category.product_id
            LEFT JOIN category ON category.id = product_category.category_id
            GROUP BY product.id;`,
        );
        return list;
    }

    async addProductIntoCategory(
        productCategoryAddDto: ProductCategoryAddDto,
    ): Promise<ProductCategoryDto> {
        try {
            const productCategory = await this.productCategoryDtoRepository.query(
                'INSERT INTO product_category (product_id, category_id) VALUES ($1, $2) RETURNING *',
                [
                    productCategoryAddDto.productId,
                    productCategoryAddDto.categoryId,
                ],
            );
            return productCategory;
        } catch (e) {
            throw new Error(e);
        }
    }
}
