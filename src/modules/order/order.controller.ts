import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
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
    getOrderList(): Promise<OrderDto[]> {
        return this.orderService.getOrderList();
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
    getCart(@Body() cartDto: CartDto[]): Promise<CartFullDto> {
        return this.orderService.getCart(cartDto);
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
    addOrder(@Body() cartDto: CartDto[]): Promise<CartFullDto> {
        return this.orderService.addOrder(cartDto);
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
    removeOrder(@UUIDParam('id') orderId: string): Promise<void> {
        return this.orderService.removeOrder(orderId);
    }
}
