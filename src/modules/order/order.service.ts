import { Injectable } from '@nestjs/common';

import type { PageDto } from '../../common/dto/PageDto';
import type { OrderDto } from './dto/OrderDto';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
    constructor(public readonly orderRepository: OrderRepository) {}

    async getOrderList(): Promise<PageDto<OrderDto>> {
        const list = await this.orderRepository.query('SELECT * FROM "order"');
        return list;
    }
}
