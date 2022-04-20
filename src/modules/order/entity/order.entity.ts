/* eslint-disable camelcase */
import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity';
import { OrderDto } from '../dto/OrderDto';

@Entity({ name: 'order' })
export class OrderEntity extends AbstractEntity<OrderDto> {
    @Column()
    order_tax: number;

    @Column()
    total: number;

    @Column()
    user_id: string | null;

    dtoClass = OrderDto;
}
