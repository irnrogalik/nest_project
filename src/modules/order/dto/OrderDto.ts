import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import type { OrderEntity } from '../entity/order.entity';

export class OrderDto extends AbstractDto {
    @ApiPropertyOptional()
    orderTax: number;

    @ApiPropertyOptional()
    total: number;

    constructor(order: OrderEntity) {
        super(order);
        this.orderTax = order.orderTax;
        this.total = order.total;
    }
}
