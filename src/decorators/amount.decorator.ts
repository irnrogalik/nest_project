import { Transform } from 'class-transformer';

import { toDecimal, toInteger } from '../shared/functions';

export function ToInteger(): PropertyDecorator {
    return Transform((params) => toInteger(params.value));
}

export function ToDecimal(): PropertyDecorator {
    return Transform((params) => toDecimal(params.value));
}
