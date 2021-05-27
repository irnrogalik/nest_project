import { Injectable } from '@nestjs/common';

import type { PageDto } from '../../common/dto/PageDto';
import type { ProductAddDto } from './dto/ProductAddDto';
import type { ProductDto } from './dto/ProductDto';
import type { ProductPageOptionsDto } from './dto/ProductPageOptionsDto';
import type { ProductEntity } from './product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
    constructor(public readonly productRepository: ProductRepository) {}

    async getProducts(
        pageOptionsDto: ProductPageOptionsDto,
    ): Promise<PageDto<ProductDto>> {
        const queryBuilder = this.productRepository.createQueryBuilder(
            'product',
        );
        const { items, pageMetaDto } = await queryBuilder.paginate(
            pageOptionsDto,
        );

        return items.toPageDto(pageMetaDto);
    }

    async addProduct(productAddDto: ProductAddDto): Promise<ProductEntity> {
        const product = this.productRepository.create(productAddDto);
        return this.productRepository.save(product);
    }
}
