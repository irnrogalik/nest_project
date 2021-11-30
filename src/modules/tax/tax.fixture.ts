import { plainToClass } from 'class-transformer';

import { PageOptionsDto } from '../../common/dto/PageOptionsDto';
import type { TaxAddDto } from './dto/TaxAddDto';
import type { TaxDto } from './dto/TaxDto';
import { TaxEntity } from './tax.entity';

export const pageOptions: PageOptionsDto = new PageOptionsDto();

export const listFullTaxesEntity: TaxEntity[] = plainToClass(TaxEntity, [
    {
        id: '20bb00de-eda9-4014-994b-f54cd91b79f2',
        createdAt: new Date('2021-10-05T19:06:15.891Z'),
        updatedAt: new Date('2021-10-05T19:06:15.891Z'),
        name: 'Basic sales',
        value: 10,
        description: 'Basic tax',
    },
    {
        id: '714578f7-43b3-46ec-9d4d-d18ccc043ad0',
        createdAt: new Date('2021-10-05T19:06:15.891Z'),
        updatedAt: new Date('2021-10-05T19:06:15.891Z'),
        name: 'Import duty',
        value: 5,
        description: 'Import tax',
    },
]);

export const listFullTaxesDto: TaxDto[] = listFullTaxesEntity.toDtos();

export const listTaxesEntity: TaxEntity[] = plainToClass(TaxEntity, [
    {
        id: '20bb00de-eda9-4014-994b-f54cd91b79f2',
        name: 'Basic sales',
    },
    {
        id: '714578f7-43b3-46ec-9d4d-d18ccc043ad0',
        name: 'Import duty',
    },
]);

export const listTaxesDto: TaxDto[] = listTaxesEntity.toDtos();

export const taxToAdd: TaxAddDto = {
    name: 'new tsx',
    value: 7,
    description: 'description about new tax',
};

export const taxAddingResult: TaxEntity = plainToClass(TaxEntity, {
    id: '71e1e2bc-9a8d-4b3e-aa32-0ad8c79acc23',
    createdAt: new Date('2021-10-11T06:44:59.145Z'),
    updatedAt: new Date('2021-10-11T06:44:59.145Z'),
    name: 'new tax',
    value: 7,
    description: 'description about new tax',
});

export const taxAddingResultDto: TaxDto = taxAddingResult.toDto();

export const taxToRemove = '20bb00de-eda9-4014-994b-f54cd91b79f2';
