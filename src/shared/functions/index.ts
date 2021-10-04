// eslint-disable-next-line import/no-named-as-default
import Decimal from 'decimal.js-light';

export function toInteger(value: number): number {
    return new Decimal(
        new Decimal(value || 0).times(100).toInteger(),
    ).toNumber();
}

export function toDecimal(value: number): number {
    return new Decimal(new Decimal(value || 0).dividedBy(100)).toNumber();
}
