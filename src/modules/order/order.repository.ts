/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import type { CartDto } from './dto/CartDto';
import type { OrderDto } from './dto/OrderDto';
import { OrderEntity } from './entity/order.entity';

@EntityRepository(OrderEntity)
export class OrderRepository extends Repository<OrderEntity> {
    getProductsInCart(cartDto: CartDto[]) {
        return this.query(
            `SELECT * FROM getProductsListInCart('{
                ${cartDto.map((product) => product.id)}
            }')`,
        );
    }

    addOrder(order: Partial<OrderDto>) {
        return this.query(
            'INSERT INTO "order" (order_tax, total) VALUES ($1, $2) RETURNING *',
            [order.orderTax, order.total],
        );
    }

    addOrderList(orderId, productId, quantity) {
        return this.query(
            'INSERT INTO order_list (order_Id, product_Id, quantity) VALUES ($1, $2, $3)',
            [orderId, productId, quantity],
        );
    }

    removeOrder(orderId: string): Promise<any> {
        return this.query('DELETE FROM "order" WHERE id = $1', [orderId]);
    }
}
