import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import {
    productAddingResult,
    productAddingResultDto,
    productCategoryList,
    productToAdd,
    productToRemove,
    productWithCategory,
} from './product.fixture';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';

describe('Product Service', () => {
    let productService: ProductService;
    let productRepository: ProductRepository;

    beforeEach(async () => {
        const ProductRepositoryProvider = {
            provide: ProductRepository,
            useFactory: () => ({
                getProductList: jest.fn(() => productWithCategory),
                addProduct: jest.fn(() => productAddingResult),
                addProductIntoCategory: jest.fn(() => true),
                removeProduct: jest.fn(() => true),
                getProductCategoryList: jest.fn(() => productCategoryList),
            }),
        };
        const app: TestingModule = await Test.createTestingModule({
            providers: [ProductRepositoryProvider, ProductService],
        }).compile();

        productService = app.get<ProductService>(ProductService);
        productRepository = app.get<ProductRepository>(ProductRepository);
    });

    describe('get product list', () => {
        it('should return list of products', async () => {
            expect(await productService.getProductList()).toEqual(
                productWithCategory,
            );
        });
    });

    describe('add product', () => {
        it('should return created product', async () => {
            expect(await productService.addProduct(productToAdd)).toEqual(
                productAddingResultDto,
            );
        });
    });

    describe('remove product', () => {
        it('should return successful result', async () => {
            expect(await productService.removeProduct(productToRemove)).toEqual(
                true,
            );
        });
    });

    describe('get product category list', () => {
        it('should return products that related to categories', async () => {
            expect(await productService.getProductCategoryList()).toEqual(
                productCategoryList,
            );
        });
    });
});
