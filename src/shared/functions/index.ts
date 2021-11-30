// eslint-disable-next-line import/no-named-as-default
import Decimal from 'decimal.js-light';

export function toInteger(value: number): number {
    return new Decimal(
        new Decimal(value || 0).times(100).toInteger(),
    ).toNumber();
}

export function toDecimal(value: number): number {
    const result = new Decimal(new Decimal(value || 0).dividedBy(100)).toFixed(
        2,
    );
    return stringToNumber(result);
}

function stringToNumber(amount: string): number {
    return new Decimal(new Decimal(amount || 0)).toNumber();
}

export function paginate(query: string, page?: number, take?: number): string {
    if (!page) {
        query = query.concat(' LIMIT ALL;');
    } else {
        query = query.concat(` LIMIT ${take} OFFSET ${(page - 1) * take}`);
    }
    return query;
}
