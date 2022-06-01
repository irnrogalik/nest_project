import { Transform } from 'class-transformer';
import { castArray, isNil, trim } from 'lodash';

/**
 * @description trim spaces from start and end, replace multiple spaces with one.
 * @example
 * @ApiProperty()
 * @IsString()
 * @Trim()
 * name: string;
 * @returns {(target: any, key: string) => void}
 * @constructor
 */
export function Trim(): (target: any, key: string) => void {
    return Transform((params) => {
        const value = params.value;
        if (Array.isArray(value)) {
            return value.map((v) => trim(v).replace(/\s\s+/g, ' '));
        }
        return trim(value).replace(/\s\s+/g, ' ');
    });
}

/**
 * @description transforms to array, specially for query params
 * @example
 * @IsNumber()
 * @ToArray()
 * name: number;
 * @constructor
 */
export function ToArray(): (target: any, key: string) => void {
    return Transform(
        (params) => {
            const value = params.value;
            if (isNil(value)) {
                return [];
            }
            return castArray(value);
        },
        { toClassOnly: true },
    );
}

export function ToLowerCase(): PropertyDecorator {
    return Transform((params) => params.value.toLowerCase(), {
        toClassOnly: true,
    });
}
