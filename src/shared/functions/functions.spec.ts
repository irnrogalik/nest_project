import { PageOptionsDto } from '../../common/dto/PageOptionsDto';
import { paginate, toDecimal, toInteger } from './index';

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

    describe('Pagination function', () => {
        describe('test pagination function with default options ', () => {
            it('paginate function should LIMIT 10 OFFSET 0', () => {
                const query = 'SELECT * FROM category';
                const pageOptions: PageOptionsDto = new PageOptionsDto();
                const expected: string = query.concat(' LIMIT 10 OFFSET 0');
                expect(paginate(query, pageOptions)).toEqual(expected);
            });
        });
        describe('test pagination function with custom options ', () => {
            it('paginate function should LIMIT 20 OFFSET 0', () => {
                const query = 'SELECT * FROM category';
                const pageOptions: PageOptionsDto = { page: 1, limit: 20 };
                expect(paginate(query, pageOptions)).toEqual(
                    query.concat(' LIMIT 20 OFFSET 0'),
                );
            });
            it('paginate function should LIMIT 2 OFFSET 20', () => {
                const query = 'SELECT * FROM category';
                const pageOptions: PageOptionsDto = { page: 2, limit: 20 };
                expect(paginate(query, pageOptions)).toEqual(
                    query.concat(' LIMIT 20 OFFSET 20'),
                );
            });
            it('paginate function should LIMIT 20 OFFSET 40', () => {
                const query = 'SELECT * FROM category';
                const pageOptions: PageOptionsDto = { page: 3, limit: 20 };
                expect(paginate(query, pageOptions)).toEqual(
                    query.concat(' LIMIT 20 OFFSET 40'),
                );
            });
        });
    });
});
