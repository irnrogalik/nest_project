import '../../boilerplate.polyfill';

import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import {
    listFullTaxesDto,
    listFullTaxesEntity,
    listTaxesDto,
    listTaxesEntity,
    taxAddingResult,
    taxAddingResultDto,
    taxToAdd,
    taxToRemove,
} from './tax.fixture';
import { TaxRepository } from './tax.repository';
import { TaxService } from './tax.service';

describe('Tax Service', () => {
    let taxService: TaxService;
    let taxRepository: TaxRepository;

    beforeEach(async () => {
        const TaxRepositoryProvider = {
            provide: TaxRepository,
            useFactory: () => ({
                getFullTaxes: jest.fn(() => listFullTaxesEntity),
                getTaxes: jest.fn(() => listTaxesEntity),
                addTax: jest.fn(() => taxAddingResult),
                removeTax: jest.fn(() => true),
            }),
        };
        const app: TestingModule = await Test.createTestingModule({
            providers: [TaxRepositoryProvider, TaxService],
        }).compile();

        taxService = app.get<TaxService>(TaxService);
        taxRepository = app.get<TaxRepository>(TaxRepository);
    });

    describe('get full taxes list ', () => {
        it('should return full list of taxes', async () => {
            expect(await taxService.getFullTaxes()).toEqual(listFullTaxesDto);
        });
    });

    describe('get taxes list', () => {
        it('should return list of taxes', async () => {
            expect(await taxService.getTaxes()).toEqual(listTaxesDto);
        });
    });

    describe('add taxes', () => {
        it('should return created tax', async () => {
            expect(await taxService.addTax(taxToAdd)).toEqual(
                taxAddingResultDto,
            );
        });
    });

    describe('remove tax', () => {
        it('should return successful result', async () => {
            expect(await taxService.removeTax(taxToRemove)).toEqual(true);
        });
    });
});
