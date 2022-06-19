import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import {
    listOfPromocodes,
    pageOptions,
    promocode,
    promocodeName,
    promocodeToAdd,
    promocodeToRemove,
} from './promo.fixture';
import { MockPromoCodeService } from './promo.mock.service';
import { PromocodeService } from './promo.service';

class ClientGrpcMock {
    getService() {
        return new MockPromoCodeService();
    }
}

describe('Promocode Service', () => {
    let promocodeService: PromocodeService;

    beforeEach(async () => {
        const PromoGRPCServiceProvider = {
            provide: 'PROMO_PACKAGE',
            useFactory: () => new ClientGrpcMock(),
        };
        const app: TestingModule = await Test.createTestingModule({
            providers: [PromocodeService, PromoGRPCServiceProvider],
        }).compile();

        promocodeService = app.get<PromocodeService>(PromocodeService);
    });

    describe('get list of promocode', () => {
        it('should return list of promocodes', async () => {
            const promocodes = await new Promise((resolve) => {
                promocodeService
                    .getListOfPromocodes(pageOptions)
                    .subscribe((value) => {
                        resolve(value);
                    });
            });
            expect(promocodes).toEqual(listOfPromocodes);
        });
    });

    describe('add promocode', () => {
        it('should return Bad Request due to promocode already exist', async () => {
            try {
                await promocodeService.addPromoCode(promocodeToAdd);
            } catch (e) {
                expect(e.response.statusCode).toBe(400);
                expect(e.response.error).toBe('Bad Request');
                expect(e.response.message).toBe(
                    'The promocode promo10 already exist',
                );
            }
        });
    });

    describe('get promocode by name', () => {
        it('should return promocode', async () => {
            expect(
                await promocodeService.getPromoCodeByName(promocodeName),
            ).toEqual(promocode);
        });
    });

    describe('remove promocode', () => {
        it('should return successful result', async () => {
            const result = await promocodeService.removePromoCode(
                promocodeToRemove,
            );
            const response = await new Promise((resolve) => {
                result.subscribe((value) => {
                    resolve(value);
                });
            });
            expect(response).toEqual({ response: true });
        });
    });

    describe('mark promocode as used', () => {
        it('should return successful result', async () => {
            const result = await promocodeService.markPromoCodeAsUsed(
                promocodeName,
            );
            const response = await new Promise((resolve) => {
                result.subscribe((value) => {
                    resolve(value);
                });
            });
            expect(response).toEqual({ response: true });
        });
    });

    describe('check if promocode exist', () => {
        it('should return successful result', async () => {
            expect(
                await promocodeService.isPromoCodeExist(promocodeName),
            ).toEqual(true);
        });
    });

    describe('check is promocode valid', () => {
        it('should return true for promocode', async () => {
            const result = await promocodeService.isPromoCodeValid(
                promocodeName,
            );
            const response = await new Promise((resolve) => {
                result.subscribe((value) => {
                    resolve(value);
                });
            });
            expect(response).toEqual({ response: true });
        });
    });
});
