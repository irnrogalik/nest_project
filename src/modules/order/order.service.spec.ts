import '../../boilerplate.polyfill';

import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { PromocodeService } from '../promocode/promo.service';
import {
    cartDtoWithoutPromocode,
    cartDtoWithPromocode,
    cartList,
    cartListWithPromocode,
    getProductsInCart,
    orderListDto,
    orderListEntity,
    orderToRemove,
    pageOptions,
    promocode,
    userId,
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
                addPromocodeOrder: jest.fn(() => true),
                removeOrder: jest.fn(() => true),
                getOrderList: jest.fn(() => orderListEntity),
            }),
        };
        const PromocodeServiceProvider = {
            provide: PromocodeService,
            useFactory: () => ({
                isPromoCodeValid: jest.fn(() => true),
                getValidPromocodeByName: jest.fn(() => promocode),
            }),
        };
        const app: TestingModule = await Test.createTestingModule({
            providers: [
                OrderRepositoryProvider,
                OrderService,
                PromocodeServiceProvider,
            ],
        }).compile();

        orderService = app.get<OrderService>(OrderService);
    });

    describe('get cart set without promocode', () => {
        it('should return list of products in cart', async () => {
            const result = await orderService.getCart(cartDtoWithoutPromocode);
            expect(result).toEqual(cartList);
            expect(result.order.orderTax).toEqual(cartList.order.orderTax);
            expect(result.order.total).toEqual(cartList.order.total);
        });
    });

    describe('get cart set with promocode', () => {
        it('should return list of products in cart', async () => {
            const result = await orderService.getCart(cartDtoWithPromocode);
            expect(result).toEqual(cartListWithPromocode);
            expect(result.order.orderTax).toEqual(
                cartListWithPromocode.order.orderTax,
            );
            expect(result.order.total).toEqual(
                cartListWithPromocode.order.total,
            );
        });
    });

    describe('add order without promocode', () => {
        it('should return created order', async () => {
            expect(
                await orderService.addOrder(cartDtoWithoutPromocode, userId),
            ).toEqual(cartList);
        });
    });

    describe('add order with promocode', () => {
        it('should return created order with promocode', async () => {
            expect(
                await orderService.addOrder(cartDtoWithPromocode, userId),
            ).toEqual(cartListWithPromocode);
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
