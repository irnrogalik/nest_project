import { toInteger, toDecimal } from './index';

describe('Shared functions', () => {
    describe('toInteger', () => {
        it('toInteger should return 1234', async () => {
            expect(toInteger(12.34)).toEqual(1234);
        });
    });

    describe('toDecimal', () => {
        it('toDecimal should return 12.34', async () => {
            expect(toDecimal(1234)).toEqual(12.34);
        });
    });
});
