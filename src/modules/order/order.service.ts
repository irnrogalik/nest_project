import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import type { PageOptionsDto } from '../../common/dto/PageOptionsDto';
import { toDecimal, toInteger } from '../../shared/functions';
import type { ProductInCartDto } from '../product/dto/ProductInCartDto';
import type { CartDto } from './dto/CartDto';
import type { CartFullDto } from './dto/CartFullDto';
import type { OrderDto } from './dto/OrderDto';
import type { OrderListDto } from './dto/OrderListDto';
import type { OrderEntity } from './entity/order.entity';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
    constructor(public readonly orderRepository: OrderRepository) {}

    async getOrderList(pageOptions: PageOptionsDto): Promise<OrderDto[]> {
        const orderList: OrderEntity[] = await this.orderRepository.getOrderList(
            pageOptions,
        );
        return orderList.toDtos();
    }

    async getCart(cartDto: CartDto[]): Promise<CartFullDto> {
        const products: ProductInCartDto[] = await this.orderRepository.getProductsInCart(
            cartDto,
        );
        const cartList: CartFullDto = this.getFinalOrderListInCart(products);
        return cartList;
    }

    getFinalOrderListInCart(products: ProductInCartDto[]): CartFullDto {
        const orderListInCart: CartFullDto = {
            products: [],
            order: {
                total: 0,
                orderTax: 0,
            },
        };

        for (const product of products) {
            const amount = (toInteger(product.amount) || 0) * product.quantity;
            const taxValue = product.taxValue;
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
        orderListInCart.order = {
            total: toDecimal(orderListInCart.order.total),
            orderTax: toDecimal(orderListInCart.order.orderTax),
        };
        return orderListInCart;
    }

    async addOrder(cartDto: CartDto[], userId: string): Promise<CartFullDto> {
        const orderList: CartFullDto = await this.getCart(cartDto);
        const order: Partial<OrderDto> = await this.orderRepository.addOrder(
            orderList.order,
            userId,
        );
        if (!order) {
            throw new BadRequestException('The order was not created');
        }
        const orderId: string = order.id;
        await this.addOrderList(orderId, orderList.products);
        return orderList;
    }

    async addOrderList(
        orderId: string,
        orderList: ProductInCartDto[],
    ): Promise<void> {
        for (const product of orderList) {
            const orderListDto: Partial<OrderListDto> = {
                orderId,
                productId: product.id,
                quantity: product.quantity,
            };
            const isAdded: boolean = await this.orderRepository.addOrderList(
                orderListDto,
            );
            if (!isAdded) {
                throw new BadRequestException(
                    `The product ${product.name} was not added into order ${orderId}`,
                );
            }
        }
    }

    async removeOrder(orderId: string): Promise<boolean> {
        if (!(await this.orderRepository.removeOrder(orderId))) {
            throw new NotFoundException(
                `The order with id ${orderId} not found.`,
            );
        }
        return true;
    }

    async getUserOrderList(
        userId: string,
        pageOptions: PageOptionsDto,
    ): Promise<OrderDto[]> {
        const orderList: OrderEntity[] = await this.orderRepository.getUserOrderList(
            userId,
            pageOptions,
        );
        return orderList.toDtos();
    }
}
