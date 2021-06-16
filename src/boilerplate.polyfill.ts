/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/naming-convention,@typescript-eslint/tslint/config */
import 'source-map-support/register';

import { compact, map } from 'lodash';

import type { PageMetaDto } from '../src/common/dto/PageMetaDto';
import type { AbstractEntity } from './common/abstract.entity';
import type { AbstractDto } from './common/dto/AbstractDto';
import { PageDto } from './common/dto/PageDto';
declare global {
    interface Array<T> {
        toDtos<T extends AbstractEntity<Dto>, Dto extends AbstractDto>(
            this: T[],
            options?: any,
        ): Dto[];

        toPageDto<T extends AbstractEntity<Dto>, Dto extends AbstractDto>(
            this: T[],
            pageMetaDto: PageMetaDto,
        ): PageDto<Dto>;
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

Array.prototype.toPageDto = function (pageMetaDto: PageMetaDto) {
    return new PageDto(this.toDtos(), pageMetaDto);
};
