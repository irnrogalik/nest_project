/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import type { PageOptionsDto } from '../../common/dto/PageOptionsDto';
import { paginate, toInteger } from '../../shared/functions';
import { ProductInCartDto } from '../product/dto/ProductInCartDto';
import type { CartDto } from './dto/CartDto';
import type { OrderDto } from './dto/OrderDto';
import type { OrderListDto } from './dto/OrderListDto';
import { OrderEntity } from './entity/order.entity';

@EntityRepository(OrderEntity)
export class OrderRepository extends Repository<OrderEntity> {
    async getOrderList(pageOptions: PageOptionsDto): Promise<OrderEntity[]> {
        const list: OrderEntity[] = await this.query(
            paginate(
                'SELECT * FROM "order"',
                pageOptions.page,
                pageOptions.take,
            ),
        );
        return plainToClass(OrderEntity, list);
    }

    async getProductsInCart(cartDto: CartDto[]): Promise<ProductInCartDto[]> {
        const productsInCart: ProductInCartDto[] = await this.query(
            `SELECT * FROM getProductsListInCart('{
                ${cartDto.map((product) => product.id)}
            }')`,
        );
        return plainToClass(ProductInCartDto, productsInCart);
    }

    async addOrder(order: Partial<OrderDto>): Promise<OrderEntity> {
        const newOrder: OrderEntity[] = await this.query(
            'INSERT INTO "order" (order_tax, total) VALUES ($1, $2) RETURNING *',
            [toInteger(order.orderTax), toInteger(order.total)],
        );
        return plainToClass(OrderEntity, newOrder[0]);
    }

    async addOrderList(orderList: Partial<OrderListDto>): Promise<boolean> {
        const orderListDto: OrderListDto = await this.query(
            'INSERT INTO order_list (order_Id, product_Id, quantity) VALUES ($1, $2, $3) RETURNING *',
            [orderList.orderId, orderList.productId, orderList.quantity],
        );
        return orderListDto[0] ? true : false;
    }

    async removeOrder(orderId: string): Promise<boolean> {
        const result: [
            [],
            boolean,
        ] = await this.query('DELETE FROM "order" WHERE id = $1', [orderId]);
        return result[1];
    }
}
