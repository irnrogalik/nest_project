import type { ProductInCartDto } from '../../../modules/product/dto/ProductInCartDto';
import type { OrderDto } from './OrderDto';

export class CartFullDto {
    products: ProductInCartDto[];

    order: Partial<OrderDto>;
}
