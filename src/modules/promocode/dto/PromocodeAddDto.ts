import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

import { ToLowerCase, Trim } from '../../../decorators/transforms.decorator';
import type { IAddPromoCode } from '../promo.interface';

export class PromocodeAddDto implements IAddPromoCode {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Trim()
    @ToLowerCase()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(100)
    percent: number;

    @ApiPropertyOptional({ default: false })
    isOneTime = false;

    @ApiPropertyOptional({ default: null })
    startDate?: Date = null;

    @ApiPropertyOptional({ default: null })
    endDate?: Date = null;
}
