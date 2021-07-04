import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { OrderDto } from './dto/OrderDto';

@Entity({ name: 'order' })
export class OrderEntity extends AbstractEntity<OrderDto> {
    @Column()
    orderTax: number;

    @Column()
    total: number;

    dtoClass = OrderDto;
}
