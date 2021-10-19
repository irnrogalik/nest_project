/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/naming-convention,@typescript-eslint/tslint/config */
import 'source-map-support/register';

import { compact, map } from 'lodash';

import type { AbstractEntity } from './common/abstract.entity';
import type { AbstractDto } from './common/dto/AbstractDto';
declare global {
    export type GetConstructorArgs<T> = T extends new (...args: infer U) => any
        ? U
        : never;
    interface Array<T> {
        toDtos<Entity extends AbstractEntity<Dto>, Dto extends AbstractDto>(
            this: T[],
            options?: any,
        ): Dto[];
    }
}

Array.prototype.toDtos = function <
    T extends AbstractEntity<Dto>,
    Dto extends AbstractDto
>(options?: any): Dto[] {
    return compact(
        map<T, Dto>(this, (item) => item.toDto(options)),
    );
};
