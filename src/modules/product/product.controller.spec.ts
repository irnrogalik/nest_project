import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import {
    productWithCategory, productToAdd, productAddingResult,
    productToRemove, productCategoryList
} from './product.fixture';

describe('ProductController', () => {
    let productController: ProductController;
    let productService: ProductService;

    beforeEach(async () => {
        const ProductServiceProvider = {
        provide: ProductService,
        useFactory: () => ({
            getProductList: jest.fn(() => productWithCategory),
            addProduct: jest.fn(() => productAddingResult),
            removeProduct: jest.fn(() => true),
            getProductCategoryList: jest.fn(() => productCategoryList),
        }),
        };
        const app: TestingModule = await Test.createTestingModule({
            controllers: [ProductController],
            providers: [ProductServiceProvider],
        }).compile();

        productController = app.get<ProductController>(ProductController);
        productService = app.get<ProductService>(ProductService);
    });

    describe('get product list', () => {
        it('should return list of products', async () => {
            expect(await productService.getProductList()).toEqual(productWithCategory);
        });
    });

    describe('add product', () => {
        it('should return created product', async () => {
            expect(await productService.addProduct(productToAdd)).toEqual(productAddingResult);
        });
    });

    describe('remove product', () => {
        it('should return successful result', async () => {
            expect(await productService.removeProduct(productToRemove)).toEqual(true);
        });
    });

    describe('get product category list', () => {
        it('should return products that related to categories', async () => {
            expect(await productService.getProductCategoryList()).toEqual(productCategoryList);
        });
    });
});
