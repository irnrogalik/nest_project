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
    usedDate?: string | null;

    @ApiProperty()
    startDate?: string | null;

    @ApiProperty()
    endDate?: string | null;

    @ApiProperty()
    deletedAt?: string | null;

    @ApiProperty()
    deletedReason?: string | null;
}
