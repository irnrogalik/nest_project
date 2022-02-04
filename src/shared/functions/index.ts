// eslint-disable-next-line import/no-named-as-default
import * as bcrypt from 'bcrypt';
import Decimal from 'decimal.js-light';

import type { PageOptionsDto } from '../../common/dto/PageOptionsDto';

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

export function paginate(query: string, pageOptions: PageOptionsDto): string {
    if (!pageOptions.page) {
        query = query.concat(' LIMIT ALL;');
    } else {
        const skip: number = (pageOptions.page - 1) * pageOptions.limit;
        query = query.concat(` LIMIT ${pageOptions.limit} OFFSET ${skip}`);
    }
    return query;
}

export async function getHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

export async function comparePasswordWithHash(
    password: string,
    hash: string,
): Promise<boolean> {
    const IsEqual = await bcrypt.compare(password, hash);
    return IsEqual;
}
