import { plainToInstance } from 'class-transformer';

import { PageOptionsDto } from '../../common/dto/PageOptionsDto';
import { ProductInCartDto } from '../product/dto/ProductInCartDto';
import type { CartDto } from './dto/CartDto';
import type { CartFullDto } from './dto/CartFullDto';
import type { OrderDto } from './dto/OrderDto';
import { OrderEntity } from './entity/order.entity';

export const pageOptions: PageOptionsDto = new PageOptionsDto();

export const cartDto: CartDto[] = [
    { id: '3ab7fed8-7270-482a-8e83-f2e4c6ae64cb', quantity: 1 },
    { id: 'efd5dee6-81d4-4f03-8363-d8fd2fb394b5', quantity: 1 },
    { id: '109a6e18-4a19-45a3-91d1-7ff2b092fb49', quantity: 1 },
];

export const getProductsInCart: ProductInCartDto[] = plainToInstance(
    ProductInCartDto,
    [
        {
            id: '109a6e18-4a19-45a3-91d1-7ff2b092fb49',
            name: 'Popcorn',
            amount: 99,
            tax_value: [null],
        },
        {
            id: '3ab7fed8-7270-482a-8e83-f2e4c6ae64cb',
            name: '6lb bag of Skittles',
            amount: 1600,
            tax_value: [null],
        },
        {
            id: 'efd5dee6-81d4-4f03-8363-d8fd2fb394b5',
            name: 'Walkman',
            amount: 9999,
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
            taxValue: [null],
        },
        {
            id: '3ab7fed8-7270-482a-8e83-f2e4c6ae64cb',
            name: '6lb bag of Skittles',
            amount: 16,
            taxValue: [null],
        },
        {
            id: 'efd5dee6-81d4-4f03-8363-d8fd2fb394b5',
            name: 'Walkman',
            amount: 99.99,
            taxValue: [10],
        },
    ],
    order: { total: 126.98, orderTax: 10 },
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
