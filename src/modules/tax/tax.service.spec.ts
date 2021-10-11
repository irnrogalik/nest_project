import { Test, TestingModule } from '@nestjs/testing';
import { TaxService } from './tax.service';
import { TaxRepository } from './tax.repository';
import {
    getFullTaxesEntity, getTaxesEntity, taxToRemove, taxAddingResult, taxAddingResultDto,
    taxToAdd
} from './tax.fixture';

describe('Tax Service', () => {
    let taxService: TaxService;
    let taxRepository: TaxRepository;

    beforeEach(async () => {
        const TaxRepositoryProvider = {
            provide: TaxRepository,
            useFactory: () => ({
                getFullTaxes: jest.fn(() => getFullTaxesEntity),
                getTaxes: jest.fn(() => getTaxesEntity),
                addTax: jest.fn(() => taxAddingResultDto),
                removeTax: jest.fn(() => true)
            }),
        };
        const app: TestingModule = await Test.createTestingModule({
            providers: [TaxRepositoryProvider, TaxService],
        }).compile();

        taxService = app.get<TaxService>(TaxService);
        taxRepository = app.get<TaxRepository>(TaxRepository);
    });

    // describe('get full taxes list ', () => {
    //     it('should return full list of taxes', async () => {
    //         expect(await taxService.getFullTaxes()).toEqual(getFullTaxesDto);
    //     });
    // });

    // describe('get taxes list', () => {
    //     it('should return list of taxes', async () => {
    //         expect(await taxService.getTaxes()).toEqual(getTaxesDto);
    //     });
    // });

    // describe('add taxes', () => {
    //     it('should return created tax', async () => {
    //         expect(await taxService.addTax(taxToAdd)).toEqual(taxAddingResultDto);
    //     });
    // });

    describe('remove tax', () => {
        it('should return successful result', async () => {
            expect(await taxService.removeTax(taxToRemove)).toEqual(true);
        });
    });
});
