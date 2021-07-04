import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { PageDto } from '../../common/dto/PageDto';
import type { OrderDto } from './dto/OrderDto';
import { OrderService } from './order.service';

@Controller('order')
@ApiTags('order')
export class OrderController {
    constructor(private orderService: OrderService) {}

    @Get('')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get order list',
        type: PageDto,
    })
    getOrderList(): Promise<PageDto<OrderDto>> {
        return this.orderService.getOrderList();
    }

    // @Get('/cart')
    // @HttpCode(HttpStatus.OK)
    // @ApiResponse({
    //     status: HttpStatus.OK,
    //     description: 'Get product list in cart',
    //     type: PageDto,
    // })
    // getProductListInCart(): Promise<PageDto<OrderDto>> {
    //     return this.orderService.getProductListInCart();
    // }

    // @Post('add')
    // @HttpCode(HttpStatus.OK)
    // @ApiResponse({
    //     status: HttpStatus.OK,
    //     description: 'Add order',
    //     type: PageDto,
    // })
    // addOrder(): Promise<PageDto<OrderDto>> {
    //     return this.orderService.addOrder();
    // }

    // @Post('remove/:id')
    // @HttpCode(HttpStatus.OK)
    // @ApiResponse({
    //     status: HttpStatus.OK,
    //     description: 'Order was successfully removed',
    // })
    // removeOrder(): Promise<PageDto<OrderDto>> {
    //     return this.orderService.removeOrder();
    // }
}
