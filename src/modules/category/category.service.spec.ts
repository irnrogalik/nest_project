import '../../boilerplate.polyfill';

import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import {
    categoryAddingResult,
    categoryAddingResultDto,
    categoryToAdd,
    categoryToRemove,
    getCategoryListDto,
    getCategoryListEntity,
    getCategoryListWithTaxes,
} from './category.fixture';
import { CategoryRepository } from './category.repository';
import { CategoryService } from './category.service';

describe('Category Service', () => {
    let categoryService: CategoryService;
    let categoryRepository: CategoryRepository;

    beforeEach(async () => {
        const CategoryRepositoryProvider = {
            provide: CategoryRepository,
            useFactory: () => ({
                getCategoryListWithTaxes: jest.fn(
                    () => getCategoryListWithTaxes,
                ),
                getCategoryList: jest.fn(() => getCategoryListEntity),
                addCategory: jest.fn(() => categoryAddingResult),
                removeCategory: jest.fn(() => true),
            }),
        };
        const app: TestingModule = await Test.createTestingModule({
            providers: [CategoryRepositoryProvider, CategoryService],
        }).compile();

        categoryService = app.get<CategoryService>(CategoryService);
        categoryRepository = app.get<CategoryRepository>(CategoryRepository);
    });

    describe('get category list with taxes', () => {
        it('should return list of category with taxes', async () => {
            expect(await categoryService.getCategoryListWithTaxes()).toEqual(
                getCategoryListWithTaxes,
            );
        });
    });

    describe('get category list', () => {
        it('should return list of category', async () => {
            expect(await categoryService.getCategoryList()).toEqual(
                getCategoryListDto,
            );
        });
    });

    describe('add category', () => {
        it('should return created category', async () => {
            expect(await categoryService.addCategory(categoryToAdd)).toEqual(
                categoryAddingResultDto,
            );
        });
    });

    describe('remove category', () => {
        it('should return successful result', async () => {
            expect(
                await categoryService.removeCategory(categoryToRemove),
            ).toEqual(true);
        });
    });
});
