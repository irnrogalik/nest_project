/* eslint-disable camelcase */
import { plainToClass } from 'class-transformer';

import { PageOptionsDto } from '../../common/dto/PageOptionsDto';
import { CategoryEntity } from './category.entity';
import type { CategoryAddDto } from './dto/CategoryAddDto';
import type { CategoryDto } from './dto/CategoryDto';
import type { CategoryListWithTaxesDto } from './dto/CategoryListWithTaxesDto';

export const pageOptions: PageOptionsDto = new PageOptionsDto();

export const getCategoryListWithTaxes: CategoryListWithTaxesDto[] = [
    {
        id: '4b89f36a-317f-49a2-8f69-7db670637206',
        name: 'Candy',
        taxname: null,
    },
    {
        id: 'eac116cf-a519-4f1f-b075-f24047d7c187',
        name: 'Coffee',
        taxname: null,
    },
    {
        id: 'd7e69861-c4b3-4f6d-ab85-bc79bacfa851',
        name: 'Popcorn',
        taxname: null,
    },
    {
        id: 'c7900ccb-deae-429a-b466-8f3b689913d0',
        name: 'Wine',
        taxname: 'Basic sales',
    },
    {
        id: '023c9a54-a524-4eed-a859-0c3ee7e56b4f',
        name: 'Imported',
        taxname: 'Import duty',
    },
    {
        id: 'b09ab6e7-ef86-44f9-84fb-d62daea2f449',
        name: 'Music device',
        taxname: 'Basic sales',
    },
    {
        id: '7e682d25-c0a9-4df1-b91d-66f398fd8771',
        name: 'Device',
        taxname: 'Basic sales',
    },
];

export const getCategoryListEntity: CategoryEntity[] = plainToClass(
    CategoryEntity,
    [
        {
            id: '4b89f36a-317f-49a2-8f69-7db670637206',
            createdAt: new Date('2021-10-05T19:06:15.891Z'),
            updatedAt: new Date('2021-10-05T19:06:15.891Z'),
            name: 'Candy',
            tax_id: null,
        },
        {
            id: 'eac116cf-a519-4f1f-b075-f24047d7c187',
            createdAt: new Date('2021-10-05T19:06:15.891Z'),
            updatedAt: new Date('2021-10-05T19:06:15.891Z'),
            name: 'Coffee',
            tax_id: null,
        },
        {
            id: 'd7e69861-c4b3-4f6d-ab85-bc79bacfa851',
            createdAt: new Date('2021-10-05T19:06:15.891Z'),
            updatedAt: new Date('2021-10-05T19:06:15.891Z'),
            name: 'Popcorn',
            tax_id: null,
        },
        {
            id: 'c7900ccb-deae-429a-b466-8f3b689913d0',
            createdAt: new Date('2021-10-05T19:06:15.891Z'),
            updatedAt: new Date('2021-10-05T19:06:15.891Z'),
            name: 'Wine',
            tax_id: '20bb00de-eda9-4014-994b-f54cd91b79f2',
        },
        {
            id: '023c9a54-a524-4eed-a859-0c3ee7e56b4f',
            createdAt: new Date('2021-10-05T19:06:15.891Z'),
            updatedAt: new Date('2021-10-05T19:06:15.891Z'),
            name: 'Imported',
            tax_id: '714578f7-43b3-46ec-9d4d-d18ccc043ad0',
        },
        {
            id: 'b09ab6e7-ef86-44f9-84fb-d62daea2f449',
            createdAt: new Date('2021-10-05T19:06:15.891Z'),
            updatedAt: new Date('2021-10-05T19:06:15.891Z'),
            name: 'Music device',
            tax_id: '20bb00de-eda9-4014-994b-f54cd91b79f2',
        },
        {
            id: '7e682d25-c0a9-4df1-b91d-66f398fd8771',
            createdAt: new Date('2021-10-05T19:06:15.891Z'),
            updatedAt: new Date('2021-10-05T19:06:15.891Z'),
            name: 'Device',
            tax_id: '20bb00de-eda9-4014-994b-f54cd91b79f2',
        },
    ],
);

export const getCategoryListDto: CategoryDto[] = getCategoryListEntity.toDtos();

export const categoryToAdd: CategoryAddDto = {
    name: 'new category',
    taxId: '20bb00de-eda9-4014-994b-f54cd91b79f2',
};

export const categoryAddingResult: CategoryEntity = plainToClass(
    CategoryEntity,
    {
        id: '0eb832bc-33e1-439f-a670-ebccbf05bd37',
        createdAt: new Date('2021-10-11T06:18:37.098Z'),
        updatedAt: new Date('2021-10-11T06:18:37.098Z'),
        name: 'new cat',
        tax_id: '20bb00de-eda9-4014-994b-f54cd91b79f2',
    },
);

export const categoryAddingResultDto: CategoryDto = categoryAddingResult.toDto();

export const categoryToRemove = '4b89f36a-317f-49a2-8f69-7db670637206';
