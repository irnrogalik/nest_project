import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { PageDto } from '../../common/dto/PageDto';
import { UUIDParam } from '../../decorators/uuid.decorators';
import type { CartDto } from './dto/CartDto';
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

    @Post('/cart')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get product list in cart',
        type: PageDto,
    })
    getCart(@Body() cartDto: CartDto[]) {
        return this.orderService.getCart(cartDto);
    }

    @Post('add')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Add order',
        type: PageDto,
    })
    addOrder(@Body() cartDto: CartDto[]) {
        return this.orderService.addOrder(cartDto);
    }

    @Post('remove/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Order was successfully removed',
    })
    removeOrder(@UUIDParam('id') orderId: string): Promise<OrderDto> {
        return this.orderService.removeOrder(orderId);
    }
}
