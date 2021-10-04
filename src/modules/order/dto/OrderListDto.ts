import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';

export class OrderListDto extends AbstractDto {
    @ApiPropertyOptional()
    orderId: string;

    @ApiPropertyOptional()
    productId: string;

    @ApiPropertyOptional()
    quantity: number;
}
