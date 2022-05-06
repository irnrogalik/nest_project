import { ApiProperty } from '@nestjs/swagger';

import type { IPromoCode } from '../promo.interface';

export class PromocodeDto implements IPromoCode {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    percent: number;

    @ApiProperty()
    isUsed: boolean;

    @ApiProperty()
    isOneTime: boolean;

    @ApiProperty()
    startDate: string;

    @ApiProperty()
    endDate: string;
}
