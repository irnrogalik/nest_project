import { AbstractDto } from '../../../common/dto/AbstractDto';
import { ToDecimal } from '../../../decorators/amount.decorator';
import type { OrderEntity } from '../entity/order.entity';

export class OrderDto extends AbstractDto {
    @ToDecimal()
    orderTax: number;

    @ToDecimal()
    total: number;

    constructor(order: OrderEntity) {
        super(order);
        this.orderTax = order.orderTax;
        this.total = order.total;
    }
}
