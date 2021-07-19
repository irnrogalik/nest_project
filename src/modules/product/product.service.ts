import { Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';

import type { PageDto } from '../../common/dto/PageDto';
import type { ProductAddDto } from './dto/ProductAddDto';
import type { ProductCategoryAddDto } from './dto/ProductCategoryAddDto';
import type { ProductCategoryDto } from './dto/ProductCategoryDto';
import type { ProductDto } from './dto/ProductDto';
import type { ProductTaxDto } from './dto/ProductTaxDto';
import type { ProductEntity } from './entity/product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
    entityManager = getManager();
    constructor(public readonly productRepository: ProductRepository) {}

    async getProductList(): Promise<ProductDto[]> {
        try {
            const products: ProductEntity[] = await this.productRepository.getProductList();
            return products;
        } catch (e) {
            throw new Error(e);
        }
    }

    async addProduct(productAddDto: ProductAddDto): Promise<ProductDto> {
        try {
            const product: ProductEntity = await this.productRepository.addProduct(
                productAddDto,
            );
            return product;
        } catch (e) {
            throw new Error(e);
        }
    }

    async removeProduct(productId: string): Promise<any> {
        try {
            return await this.productRepository.removeProduct(productId);
        } catch (e) {
            throw new Error(e);
        }
    }

    async getProductCategoryList(): Promise<PageDto<ProductCategoryDto>> {
        try {
            return await this.productRepository.getProductCategoryList();
        } catch (e) {
            throw new Error(e);
        }
    }

    async addProductIntoCategory(
        productCategoryAddDto: ProductCategoryAddDto,
    ): Promise<void> {
        try {
            for (const categoryId of productCategoryAddDto.categories) {
                const productCategoryDto: Partial<ProductCategoryDto> = {
                    productId: productCategoryAddDto.productId,
                    categoryId,
                };
                await this.productRepository.addProductIntoCategory(
                    productCategoryDto,
                );
            }
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
