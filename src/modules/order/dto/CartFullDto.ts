import { ApiProperty } from '@nestjs/swagger';

import { ProductInCartDto } from '../../../modules/product/dto/ProductInCartDto';
import { OrderDto } from './OrderDto';

export class CartFullDto {
    @ApiProperty({ type: [ProductInCartDto] })
    products: ProductInCartDto[];

    @ApiProperty({ type: OrderDto })
    order: Partial<OrderDto>;

    @ApiProperty()
    promocode?: string;
}
