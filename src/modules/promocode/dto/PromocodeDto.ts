import { ApiProperty } from '@nestjs/swagger';

import type { IPromoCode } from '../promo.interface';

export class PromocodeDto implements IPromoCode {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    createdAt: string;

    @ApiProperty()
    percent: number;

    @ApiProperty()
    isOneTime: boolean;

    @ApiProperty()
    usedDate: string;

    @ApiProperty()
    startDate: string;

    @ApiProperty()
    endDate: string;

    @ApiProperty()
    deletedAt: string;

    @ApiProperty()
    deletedReason: string;
}
