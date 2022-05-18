import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { ToLowerCase, Trim } from '../../../decorators/transforms.decorator';
import type { IRemovePromoCode } from '../promo.interface';

export class PromocodeRemoveDto implements IRemovePromoCode {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Trim()
    @ToLowerCase()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Trim()
    deletedReason: string;
}
