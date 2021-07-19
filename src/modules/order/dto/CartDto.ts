import { ApiProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import type { CartEntity } from '../entity/cart.entity';

export class CartDto extends AbstractDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    quantity: number;

    constructor(cart: CartEntity) {
        super(cart);
        this.id = cart.id;
        this.quantity = cart.quantity;
    }
}
