import { Injectable } from '@nestjs/common';

import type { PageDto } from '../../common/dto/PageDto';
import type { ProductInCartDto } from '../product/dto/ProductInCartDto';
import type { CartDto } from './dto/CartDto';
import type { CartFullDto } from './dto/CartFullDto';
import type { OrderDto } from './dto/OrderDto';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
    constructor(public readonly orderRepository: OrderRepository) {}

    async getOrderList(): Promise<PageDto<OrderDto>> {
        const list = await this.orderRepository.query('SELECT * FROM "order"');
        return list;
    }

    async getCart(cartDto: CartDto[]): Promise<CartFullDto> {
        try {
            const products: ProductInCartDto[] = await this.orderRepository.getProductsInCart(
                cartDto,
            );
            const cartList: CartFullDto = this.getFinalOrderListInCart(
                products,
            );
            return cartList;
        } catch (e) {
            throw new Error(e);
        }
    }

    getFinalOrderListInCart(products: ProductInCartDto[]) {
        const orderListInCart: CartFullDto = {
            products: [],
            order: {
                total: 0,
                orderTax: 0,
            },
        };

        for (const product of products) {
            const amount = Number(product.amount || 0);
            const taxValue = product.tax_value;
            let tax = 0;

            if (Array.isArray(taxValue) && taxValue.length > 0) {
                taxValue.map(
                    (taxVal) => (tax += Number(amount * (taxVal / 100))),
                );
            }

            orderListInCart.order.total += amount + tax;
            orderListInCart.order.orderTax += tax;
            orderListInCart.products.push(product);
        }
        return orderListInCart;
    }

    async addOrder(cartDto: CartDto[]) {
        try {
            const orderList: CartFullDto = await this.getCart(cartDto);
            const order: Partial<OrderDto> = await this.orderRepository.addOrder(
                orderList.order,
            );
            const orderId: string = order[0].id;
            await this.addOrderList(orderId, orderList.products);
            return orderList;
        } catch (e) {
            throw new Error(e);
        }
    }

    async addOrderList(orderId: string, orderList: ProductInCartDto[]) {
        try {
            for (const product of orderList) {
                await this.orderRepository.addOrderList(
                    orderId,
                    product.id,
                    product.quantity,
                );
            }
        } catch (e) {
            throw new Error(e);
        }
    }

    async removeOrder(orderId: string): Promise<any> {
        try {
            return await this.orderRepository.removeOrder(orderId);
        } catch (e) {
            throw new Error(e);
        }
    }
}
