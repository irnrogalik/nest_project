import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import type { PageOptionsDto } from '../../common/dto/PageOptionsDto';
import { toDecimal, toInteger } from '../../shared/functions';
import type { ProductInCartDto } from '../product/dto/ProductInCartDto';
import type { PromocodeNameDto } from '../promocode/dto/PromocodeNameDto';
import type { IPromoCode } from '../promocode/promo.interface';
import { PromocodeService } from '../promocode/promo.service';
import type { CartFullDto } from './dto/CartFullDto';
import type { CartWithPromocodeDto } from './dto/CartWithPromocodeDto';
import type { OrderDto } from './dto/OrderDto';
import type { OrderListDto } from './dto/OrderListDto';
import type { OrderEntity } from './entity/order.entity';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
    constructor(
        public readonly orderRepository: OrderRepository,
        private promocodeService: PromocodeService,
    ) {}

    async getOrderList(pageOptions: PageOptionsDto): Promise<OrderDto[]> {
        const orderList: OrderEntity[] = await this.orderRepository.getOrderList(
            pageOptions,
        );
        return orderList.toDtos();
    }

    async getCart(cartDto: CartWithPromocodeDto): Promise<CartFullDto> {
        let promocode: IPromoCode;
        const products: ProductInCartDto[] = await this.orderRepository.getProductsInCart(
            cartDto.products,
        );
        if (cartDto.promocode) {
            promocode = await this.getPromocode(cartDto.promocode);
        }
        const cartList: CartFullDto = this.getFinalOrderListInCart(
            products,
            promocode,
        );
        return cartList;
    }

    getFinalOrderListInCart(
        products: ProductInCartDto[],
        promocode: IPromoCode,
    ): CartFullDto {
        const orderListInCart: CartFullDto = {
            products: [],
            order: {
                total: 0,
                orderTax: 0,
            },
            promocode: '',
        };
        let additionalDiscount = 0;
        if (promocode && promocode.percent) {
            additionalDiscount = promocode.percent;
            orderListInCart.promocode = promocode.name;
        }

        for (const product of products) {
            let amount = (toInteger(product.amount) || 0) * product.quantity;
            if (additionalDiscount) {
                amount = amount - (amount / 100) * additionalDiscount;
            }
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

    async addOrder(
        cartDto: CartWithPromocodeDto,
        userId: string,
    ): Promise<CartFullDto> {
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
        if (cartDto.promocode) {
            const promocode = await this.getPromocode(cartDto.promocode);
            await this.orderRepository.addPromocodeOrder(
                orderId,
                promocode.name,
            );
        }
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

    async getPromocode(promocodeName: string): Promise<IPromoCode> {
        const promo: PromocodeNameDto = { name: promocodeName };
        const isValid = await this.promocodeService.isPromoCodeValid(promo);
        if (isValid) {
            const promocode = this.promocodeService.getPromocodeByName(promo);
            return promocode;
        }
    }
}
