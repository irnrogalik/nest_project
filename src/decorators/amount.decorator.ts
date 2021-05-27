import { Transform } from 'class-transformer';

export function ToInteger() {
    return Transform((params) => {
        const value = params.value;
        return value * 100;
    });
}

export function ToDecimal() {
    return Transform((params) => {
        const value = params.value;
        return value / 100;
    });
}
