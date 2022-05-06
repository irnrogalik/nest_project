import { ApiProperty } from '@nestjs/swagger';

import type { IPromoCodeBoolResponse } from '../promo.interface';

export class PromoCodeBoolResponseDto implements IPromoCodeBoolResponse {
    @ApiProperty()
    response: boolean;
}
