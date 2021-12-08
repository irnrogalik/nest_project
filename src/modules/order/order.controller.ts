import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Query,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

import { PageOptionsDto } from '../../common/dto/PageOptionsDto';
import { UUIDParam } from '../../decorators/uuid.decorators';
import type { CartDto } from './dto/CartDto';
import { CartFullDto } from './dto/CartFullDto';
import { OrderDto } from './dto/OrderDto';
import { OrderService } from './order.service';

@Controller('order')
@ApiTags('order')
export class OrderController {
    constructor(private orderService: OrderService) {}

    @Get('')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        status: HttpStatus.OK,
        description: 'Get order list',
        type: OrderDto,
    })
    @ApiBadRequestResponse({
        description: 'Error occurred during getting order list',
    })
    async getOrderList(
        @Query() pageOptions: PageOptionsDto,
    ): Promise<OrderDto[]> {
        const orderList: OrderDto[] = await this.orderService.getOrderList(
            pageOptions,
        );
        return orderList;
    }

    @Post('/cart')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get product list in cart',
        type: CartFullDto,
    })
    @ApiBadRequestResponse({
        description: 'Error occurred during getting cart',
    })
    async getCart(@Body() cartDto: CartDto[]): Promise<CartFullDto> {
        const cart: CartFullDto = await this.orderService.getCart(cartDto);
        return cart;
    }

    @Post('add')
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({
        description: 'Order was successfully added',
        type: CartFullDto,
    })
    @ApiBadRequestResponse({
        description: 'Error occurred during adding order',
    })
    async addOrder(@Body() cartDto: CartDto[]): Promise<CartFullDto> {
        const addResult: CartFullDto = await this.orderService.addOrder(
            cartDto,
        );
        return addResult;
    }

    @Post('remove/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiNoContentResponse({
        description: 'Order was successfully removed',
    })
    @ApiNotFoundResponse({
        description: 'The order was not found',
    })
    @ApiBadRequestResponse({
        description: 'Error occurred during removing order',
    })
    async removeOrder(@UUIDParam('id') orderId: string): Promise<boolean> {
        const result: boolean = await this.orderService.removeOrder(orderId);
        return result;
    }
}
