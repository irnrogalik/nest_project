import '../../boilerplate.polyfill';

import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import {
    cartDto,
    cartList,
    getProductsInCart,
    orderListDto,
    orderListEntity,
    orderToRemove,
    pageOptions,
} from './order.fixture';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';

describe('Order Service', () => {
    let orderService: OrderService;

    beforeAll(async () => {
        const OrderRepositoryProvider = {
            provide: OrderRepository,
            useFactory: () => ({
                getProductsInCart: jest.fn(() => getProductsInCart),
                addOrder: jest.fn(() => cartList),
                addOrderList: jest.fn(() => true),
                removeOrder: jest.fn(() => true),
                getOrderList: jest.fn(() => orderListEntity),
            }),
        };
        const app: TestingModule = await Test.createTestingModule({
            providers: [OrderRepositoryProvider, OrderService],
        }).compile();

        orderService = app.get<OrderService>(OrderService);
    });

    describe('get cart set', () => {
        it('should return list of products in cart', async () => {
            const result = await orderService.getCart(cartDto);
            expect(result).toEqual(cartList);
            expect(result.order.orderTax).toEqual(cartList.order.orderTax);
            expect(result.order.total).toEqual(cartList.order.total);
        });
    });

    describe('add product', () => {
        it('should return created order', async () => {
            expect(await orderService.addOrder(cartDto)).toEqual(cartList);
        });
    });

    describe('remove order', () => {
        it('should return successful result', async () => {
            expect(await orderService.removeOrder(orderToRemove)).toEqual(true);
        });
    });

    describe('get order list', () => {
        it('should return list of orders', async () => {
            expect(await orderService.getOrderList(pageOptions)).toEqual(
                orderListDto,
            );
        });
    });
});
