import { ApiProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';

export class OrderListDto extends AbstractDto {
    @ApiProperty()
    orderId: string;

    @ApiProperty()
    productId: string;

    @ApiProperty()
    quantity: number;
}
