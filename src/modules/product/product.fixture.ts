import { plainToClass } from 'class-transformer';

import { PageOptionsDto } from '../../common/dto/PageOptionsDto';
import type { ProductAddDto } from './dto/ProductAddDto';
import type { ProductCategoryListDto } from './dto/ProductCategoryListDto';
import type { ProductDto } from './dto/ProductDto';
import type { ProductWithCategoryDto } from './dto/ProductWithCategoryDto';
import { ProductEntity } from './entity/product.entity';

export const pageOptions: PageOptionsDto = new PageOptionsDto();

export const productWithCategory: ProductWithCategoryDto[] = [
    {
        id: '109a6e18-4a19-45a3-91d1-7ff2b092fb49',
        name: 'Popcorn',
        amount: 0.99,
        categoryname: ['Popcorn'],
    },
    {
        id: '20e5412c-eb74-452a-a64d-8cfb095e169a',
        name: 'Bottle of Wine',
        amount: 10,
        categoryname: ['Wine', 'Imported'],
    },
    {
        id: '3ab7fed8-7270-482a-8e83-f2e4c6ae64cb',
        name: '6lb bag of Skittles',
        amount: 16,
        categoryname: ['Candy'],
    },
    {
        id: '8261b4fc-9d24-494b-809e-e410f50c5f67',
        name: '300# bag of Fair-Trade Coffee',
        amount: 997.99,
        categoryname: ['Coffee'],
    },
    {
        id: 'c6245647-1c16-4ca8-9e01-629a75ae8b26',
        name: 'Vespa',
        amount: 15001.25,
        categoryname: ['Imported', 'Device'],
    },
    {
        id: 'cfd10d72-b4e8-4ea6-a65b-e381eb2c80be',
        name: 'Vanilla-Hazelnut Coffee',
        amount: 11,
        categoryname: ['Coffee', 'Imported'],
    },
    {
        id: 'da4b9065-550d-47d8-a196-ad4461664bde',
        name: 'crate of Almond Snickers',
        amount: 75.99,
        categoryname: ['Coffee', 'Imported'],
    },
    {
        id: 'db4b0381-f0b5-4e92-b1ca-a8cf593983f4',
        name: 'Discman',
        amount: 55,
        categoryname: ['Music device'],
    },
    {
        id: 'efd5dee6-81d4-4f03-8363-d8fd2fb394b5',
        name: 'Walkman',
        amount: 99.99,
        categoryname: ['Music device'],
    },
];

export const productToAdd: ProductAddDto = {
    name: 'new candy',
    amount: 2350,
    categories: ['4b89f36a-317f-49a2-8f69-7db670637206'],
};

export const productAddingResult: ProductEntity = plainToClass(ProductEntity, {
    id: '8d7a3ea5-97e6-4a5d-a637-40331e3faabb',
    createdAt: new Date('2021-10-11T05:46:30.627Z'),
    updatedAt: new Date('2021-10-11T05:46:30.627Z'),
    name: 'new candy',
    amount: 2350,
});

export const productAddingResultDto: ProductDto = productAddingResult.toDto();

export const productToRemove = '8d7a3ea5-97e6-4a5d-a637-40331e3faabb';

export const productCategoryList: ProductCategoryListDto[] = [
    {
        productid: '109a6e18-4a19-45a3-91d1-7ff2b092fb49',
        productname: 'Popcorn',
        categoryid: ['d7e69861-c4b3-4f6d-ab85-bc79bacfa851'],
        categoryname: ['Popcorn'],
    },
    {
        productid: '20e5412c-eb74-452a-a64d-8cfb095e169a',
        productname: 'Bottle of Wine',
        categoryid: [
            'c7900ccb-deae-429a-b466-8f3b689913d0',
            '023c9a54-a524-4eed-a859-0c3ee7e56b4f',
        ],
        categoryname: ['Wine', 'Imported'],
    },
    {
        productid: '3ab7fed8-7270-482a-8e83-f2e4c6ae64cb',
        productname: '6lb bag of Skittles',
        categoryid: ['4b89f36a-317f-49a2-8f69-7db670637206'],
        categoryname: ['Candy'],
    },
    {
        productid: '8261b4fc-9d24-494b-809e-e410f50c5f67',
        productname: '300# bag of Fair-Trade Coffee',
        categoryid: ['eac116cf-a519-4f1f-b075-f24047d7c187'],
        categoryname: ['Coffee'],
    },
    {
        productid: 'c6245647-1c16-4ca8-9e01-629a75ae8b26',
        productname: 'Vespa',
        categoryid: [
            '023c9a54-a524-4eed-a859-0c3ee7e56b4f',
            '7e682d25-c0a9-4df1-b91d-66f398fd8771',
        ],
        categoryname: ['Imported', 'Device'],
    },
    {
        productid: 'cfd10d72-b4e8-4ea6-a65b-e381eb2c80be',
        productname: 'Vanilla-Hazelnut Coffee',
        categoryid: [
            'eac116cf-a519-4f1f-b075-f24047d7c187',
            '023c9a54-a524-4eed-a859-0c3ee7e56b4f',
        ],
        categoryname: ['Coffee', 'Imported'],
    },
    {
        productid: 'da4b9065-550d-47d8-a196-ad4461664bde',
        productname: 'crate of Almond Snickers',
        categoryid: [
            'eac116cf-a519-4f1f-b075-f24047d7c187',
            '023c9a54-a524-4eed-a859-0c3ee7e56b4f',
        ],
        categoryname: ['Coffee', 'Imported'],
    },
    {
        productid: 'db4b0381-f0b5-4e92-b1ca-a8cf593983f4',
        productname: 'Discman',
        categoryid: ['b09ab6e7-ef86-44f9-84fb-d62daea2f449'],
        categoryname: ['Music device'],
    },
    {
        productid: 'efd5dee6-81d4-4f03-8363-d8fd2fb394b5',
        productname: 'Walkman',
        categoryid: ['b09ab6e7-ef86-44f9-84fb-d62daea2f449'],
        categoryname: ['Music device'],
    },
];
