import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import type { PageOptionsDto } from '../../common/dto/PageOptionsDto';
import type { ProductAddDto } from './dto/ProductAddDto';
import type { ProductCategoryAddDto } from './dto/ProductCategoryAddDto';
import type { ProductCategoryDto } from './dto/ProductCategoryDto';
import type { ProductCategoryListDto } from './dto/ProductCategoryListDto';
import type { ProductDto } from './dto/ProductDto';
import type { ProductTaxListDto } from './dto/ProductTaxListDto';
import type { ProductWithCategoryDto } from './dto/ProductWithCategoryDto';
import type { ProductEntity } from './entity/product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
    constructor(public readonly productRepository: ProductRepository) {}

    async getProductList(
        pageOptions: PageOptionsDto,
    ): Promise<ProductWithCategoryDto[]> {
        const productWithCategoryList: ProductWithCategoryDto[] = await this.productRepository.getProductList(
            pageOptions,
        );
        return productWithCategoryList;
    }

    async addProduct(productAddDto: ProductAddDto): Promise<ProductDto> {
        const product: ProductEntity = await this.productRepository.addProduct(
            productAddDto,
        );
        if (!product) {
            throw new BadRequestException(
                `The product ${productAddDto.name} was not created`,
            );
        }
        if (productAddDto.categories && productAddDto.categories.length > 0) {
            const productCategoryAddDto: ProductCategoryAddDto = {
                productId: product.id,
                categories: productAddDto.categories,
            };
            await this.addProductIntoCategory(productCategoryAddDto);
        }
        return product.toDto();
    }

    async removeProduct(productId: string): Promise<boolean> {
        if (!(await this.productRepository.removeProduct(productId))) {
            throw new NotFoundException(
                `The product with id ${productId} not found.`,
            );
        }
        return true;
    }

    async getProductCategoryList(): Promise<ProductCategoryListDto[]> {
        const productCategoryList: ProductCategoryListDto[] = await this.productRepository.getProductCategoryList();
        return productCategoryList;
    }

    async addProductIntoCategory(
        productCategoryAddDto: ProductCategoryAddDto,
    ): Promise<void> {
        for (const categoryId of productCategoryAddDto.categories) {
            const productCategoryDto: Partial<ProductCategoryDto> = {
                productId: productCategoryAddDto.productId,
                categoryId,
            };
            const isAdded: boolean = await this.productRepository.addProductIntoCategory(
                productCategoryDto,
            );
            if (!isAdded) {
                throw new BadRequestException(
                    `The product ${productCategoryAddDto.productId} was not added into category ${categoryId}`,
                );
            }
        }
    }

    async getProductTaxList(): Promise<ProductTaxListDto[]> {
        const productTaxList: ProductTaxListDto[] = await this.productRepository.getProductTaxList();
        return productTaxList;
    }
}
