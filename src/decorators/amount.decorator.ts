import { Transform } from 'class-transformer';

export function ToInteger(): PropertyDecorator {
    return Transform((params) => {
        const value = params.value;
        return value * 10 * 10;
    });
}

export function ToDecimal(): PropertyDecorator {
    return Transform((params) => {
        const value = params.value;
        return value / 100;
    });
}
