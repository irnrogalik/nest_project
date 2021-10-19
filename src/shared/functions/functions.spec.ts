import { toDecimal, toInteger } from './index';

describe('Shared functions', () => {
    describe('toInteger', () => {
        it('toInteger should return 1234', () => {
            expect(toInteger(12.34)).toEqual(1234);
        });
    });

    describe('toDecimal', () => {
        it('toDecimal should return 12.34', () => {
            expect(toDecimal(1234)).toEqual(12.34);
        });
    });
});
