import { ApiProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { ToDecimal } from '../../../decorators/amount.decorator';
import type { OrderEntity } from '../entity/order.entity';

export class OrderDto extends AbstractDto {
    @ApiProperty()
    @ToDecimal()
    orderTax: number;

    @ApiProperty()
    @ToDecimal()
    total: number;

    @ApiProperty()
    userId: string | null;

    constructor(order: OrderEntity) {
        super(order);
        this.orderTax = order.orderTax;
        this.total = order.total;
        this.userId = order.userId;
    }
}
