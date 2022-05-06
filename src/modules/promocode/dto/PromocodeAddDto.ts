import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsNumberString,
    IsOptional,
    IsString,
} from 'class-validator';

import { Trim } from '../../../decorators/transforms.decorator';
import type { IAddPromoCode } from '../promo.interface';

export class PromocodeAddDto implements IAddPromoCode {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Trim()
    name: string;

    @ApiProperty()
    @IsNumberString()
    @IsNotEmpty()
    @Trim()
    percent: number;

    @ApiProperty()
    @IsOptional()
    isOneTime: boolean;

    @ApiProperty()
    @IsOptional()
    startDate: string;

    @ApiProperty()
    @IsOptional()
    endDate: string;
}
