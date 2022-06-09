import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Query,
    Request,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiBody,
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

import { PageOptionsDto } from '../../common/dto/PageOptionsDto';
import type { JwtUserPayload } from '../../common/model';
import { Roles } from '../../decorators/roles.decorator';
import { UUIDParam } from '../../decorators/uuid.decorators';
import { AdminJwtAuthGuard } from '../auth/admin/guard/admin.jwt-auth.guard';
import { JwtAuthGuard } from '../auth/user/guard/jwt-auth.guard';
import { Role } from '../user/role.enum';
import { RoleGuard } from '../user/role.guard';
import { CartFullDto } from './dto/CartFullDto';
import { CartWithPromocodeDto } from './dto/CartWithPromocodeDto';
import { OrderDto } from './dto/OrderDto';
import { OrderService } from './order.service';

@Controller('order')
@ApiTags('order')
export class OrderController {
    constructor(private orderService: OrderService) {}

    @Get('fullList')
    @ApiBearerAuth()
    @UseGuards(AdminJwtAuthGuard, RoleGuard)
    @Roles(Role.ADMIN)
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
    @ApiBody({ type: CartWithPromocodeDto })
    async getCart(@Body() cartDto: CartWithPromocodeDto): Promise<CartFullDto> {
        const cart: CartFullDto = await this.orderService.getCart(cartDto);
        return cart;
    }

    @Post('add')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(Role.USER)
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({
        description: 'Order was successfully added',
        type: CartFullDto,
    })
    @ApiBadRequestResponse({
        description: 'Error occurred during adding order',
    })
    async addOrder(
        @Body() cartDto: CartWithPromocodeDto,
        @Request() req: { user: JwtUserPayload },
    ): Promise<CartFullDto> {
        const user: JwtUserPayload = req.user;
        const addResult: CartFullDto = await this.orderService.addOrder(
            cartDto,
            user.id,
        );
        return addResult;
    }

    @Post('remove/:id')
    @ApiBearerAuth()
    @UseGuards(AdminJwtAuthGuard, RoleGuard)
    @Roles(Role.ADMIN)
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

    @Get('userList')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(Role.USER)
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Get order list',
        type: OrderDto,
    })
    @ApiNoContentResponse({
        description: 'User order list was successfully get',
    })
    @ApiNotFoundResponse({
        description: 'The order list was not found',
    })
    @ApiBadRequestResponse({
        description: 'Error occurred during getting user order list',
    })
    async getUserOrderList(
        @Request() req: { user: JwtUserPayload },
        @Query() pageOptions: PageOptionsDto,
    ): Promise<OrderDto[]> {
        const userId: string = req.user.id;
        const orderList: OrderDto[] = await this.orderService.getUserOrderList(
            userId,
            pageOptions,
        );
        return orderList;
    }
}
