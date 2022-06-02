/* eslint-disable camelcase */
import { plainToInstance } from 'class-transformer';

import { PageOptionsDto } from '../../common/dto/PageOptionsDto';
import { ProductInCartDto } from '../product/dto/ProductInCartDto';
import type { PromocodeDto } from '../promocode/dto/PromocodeDto';
import type { CartFullDto } from './dto/CartFullDto';
import type { CartWithPromocodeDto } from './dto/CartWithPromocodeDto';
import type { OrderDto } from './dto/OrderDto';
import { OrderEntity } from './entity/order.entity';

export const pageOptions: PageOptionsDto = new PageOptionsDto();

export const userId = '0c9b3178-bf8d-4f28-954c-0dc94fe23460';

export const cartDtoWithoutPromocode: CartWithPromocodeDto = {
    products: [
        { id: '3ab7fed8-7270-482a-8e83-f2e4c6ae64cb', quantity: 1 },
        { id: 'efd5dee6-81d4-4f03-8363-d8fd2fb394b5', quantity: 1 },
        { id: '109a6e18-4a19-45a3-91d1-7ff2b092fb49', quantity: 1 },
    ],
};

export const cartDtoWithPromocode: CartWithPromocodeDto = {
    products: [
        { id: '3ab7fed8-7270-482a-8e83-f2e4c6ae64cb', quantity: 1 },
        { id: 'efd5dee6-81d4-4f03-8363-d8fd2fb394b5', quantity: 1 },
        { id: '109a6e18-4a19-45a3-91d1-7ff2b092fb49', quantity: 1 },
    ],
    promocode: 'promo10',
};

export const getProductsInCart: ProductInCartDto[] = plainToInstance(
    ProductInCartDto,
    [
        {
            id: '109a6e18-4a19-45a3-91d1-7ff2b092fb49',
            name: 'Popcorn',
            amount: 99,
            quantity: 1,
            tax_value: [null],
        },
        {
            id: '3ab7fed8-7270-482a-8e83-f2e4c6ae64cb',
            name: '6lb bag of Skittles',
            amount: 1600,
            quantity: 1,
            tax_value: [null],
        },
        {
            id: 'efd5dee6-81d4-4f03-8363-d8fd2fb394b5',
            name: 'Walkman',
            amount: 9999,
            quantity: 1,
            tax_value: [10],
        },
    ],
);

export const cartList: CartFullDto = {
    products: [
        {
            id: '109a6e18-4a19-45a3-91d1-7ff2b092fb49',
            name: 'Popcorn',
            amount: 0.99,
            quantity: 1,
            taxValue: [null],
        },
        {
            id: '3ab7fed8-7270-482a-8e83-f2e4c6ae64cb',
            name: '6lb bag of Skittles',
            amount: 16,
            quantity: 1,
            taxValue: [null],
        },
        {
            id: 'efd5dee6-81d4-4f03-8363-d8fd2fb394b5',
            name: 'Walkman',
            amount: 99.99,
            quantity: 1,
            taxValue: [10],
        },
    ],
    order: { total: 126.98, orderTax: 10 },
    promocode: '',
};

export const cartListWithPromocode: CartFullDto = {
    products: [
        {
            id: '109a6e18-4a19-45a3-91d1-7ff2b092fb49',
            name: 'Popcorn',
            amount: 0.99,
            quantity: 1,
            taxValue: [null],
        },
        {
            id: '3ab7fed8-7270-482a-8e83-f2e4c6ae64cb',
            name: '6lb bag of Skittles',
            amount: 16,
            quantity: 1,
            taxValue: [null],
        },
        {
            id: 'efd5dee6-81d4-4f03-8363-d8fd2fb394b5',
            name: 'Walkman',
            amount: 99.99,
            quantity: 1,
            taxValue: [10],
        },
    ],
    order: { total: 114.28, orderTax: 9 },
    promocode: 'promo10',
};

export const orderToRemove = '5f023b97-34c9-476d-ada1-2f58b82f1505';

export const orderListEntity: OrderEntity[] = plainToInstance(OrderEntity, [
    {
        id: '5f023b97-34c9-476d-ada1-2f58b82f1505',
        createdAt: new Date('2021-10-18T19:49:15.430Z'),
        updatedAt: new Date('2021-10-18T19:49:15.430Z'),
        order_tax: 1000,
        total: 12698,
    },
    {
        id: '2c9cacab-734a-4f5e-827b-b8c05ed823b9',
        createdAt: new Date('2021-10-18T19:53:34.255Z'),
        updatedAt: new Date('2021-10-18T19:53:34.255Z'),
        order_tax: 55,
        total: 1155,
    },
]);

export const orderListDto: OrderDto[] = orderListEntity.toDtos();

export const promocode: PromocodeDto = {
    id: '6ff628b0-7dd1-40fd-9d00-1298d5037eb3',
    createdAt: 'Wed Jun 01 2022 10:04:59 GMT+0400 (Georgia Standard Time)',
    name: 'promo10',
    percent: 10,
    isOneTime: false,
};
