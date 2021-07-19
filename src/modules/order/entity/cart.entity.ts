import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity';
import { CartDto } from '../dto/CartDto';

@Entity({ name: 'cart' })
export class CartEntity extends AbstractEntity<CartDto> {
    @Column()
    id: string;

    @Column()
    quantity: number;

    dtoClass = CartDto;
}
