import { Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';

import type { PageDto } from '../../common/dto/PageDto';
import type { ProductAddDto } from './dto/ProductAddDto';
import type { ProductDto } from './dto/ProductDto';
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
}
