import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { ToLowerCase, Trim } from '../../../decorators/transforms.decorator';
import type { IPromoCodeName } from '../promo.interface';

export class PromocodeNameDto implements IPromoCodeName {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Trim()
    @ToLowerCase()
    name: string;
}
