import { ApiProperty } from '@nestjs/swagger';

import type { IPromoCodeName } from '../promo.interface';

export class PromocodeNameDto implements IPromoCodeName {
    @ApiProperty()
    name: string;
}
