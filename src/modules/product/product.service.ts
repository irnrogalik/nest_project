import { Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';

import type { PageDto } from '../../common/dto/PageDto';
import type { ProductAddDto } from './dto/ProductAddDto';
import type { ProductCategoryAddDto } from './dto/ProductCategoryAddDto';
import type { ProductCategoryDto } from './dto/ProductCategoryDto';
import type { ProductDto } from './dto/ProductDto';
import type { ProductTaxDto } from './dto/ProductTaxDto';
import type { ProductEntity } from './product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
    entityManager = getManager();
    constructor(public readonly productRepository: ProductRepository) {}

    async getProductList(): Promise<PageDto<ProductDto>> {
        const products = await this.entityManager.query(
            'SELECT * FROM product',
        );
        return products;
    }

    async addProduct(productAddDto: ProductAddDto): Promise<ProductEntity> {
        try {
            const product: ProductEntity = await this.productRepository.query(
                'INSERT INTO product (name, amount) VALUES ($1, $2) RETURNING *',
                [productAddDto.name, productAddDto.amount],
            );
            return product;
        } catch (e) {
            throw new Error(e);
        }
    }

    async removeProduct(productId: string): Promise<any> {
        try {
            return await this.productRepository.query(
                'DELETE FROM product WHERE id = $1',
                [productId],
            );
        } catch (e) {
            throw new Error(e);
        }
    }

    async getProductCategoryList(): Promise<PageDto<ProductCategoryDto>> {
        const list = await this.productRepository.query(
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
            const productCategory = await this.productRepository.query(
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

    async getProductTaxList(): Promise<PageDto<ProductTaxDto>> {
        const list = await this.productRepository.query(
            `SELECT product.id AS productId, product.name AS productName,
                array_agg(tax.id) AS taxId, array_agg(tax.name) AS taxName
            FROM product_tax
            LEFT JOIN product ON product.id = product_tax.product_id
            LEFT JOIN tax ON tax.id = product_tax.tax_id
            GROUP BY product.id;`,
        );
        return list;
    }
}
