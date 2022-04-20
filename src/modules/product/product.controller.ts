import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

import { PageOptionsDto } from '../../common/dto/PageOptionsDto';
import { Roles } from '../../decorators/roles.decorator';
import { UUIDParam } from '../../decorators/uuid.decorators';
import { AdminJwtAuthGuard } from '../auth/admin/guard/admin.jwt-auth.guard';
import { Role } from '../user/role.enum';
import { RoleGuard } from '../user/role.guard';
import { ProductAddDto } from './dto/ProductAddDto';
import { ProductCategoryListDto } from './dto/ProductCategoryListDto';
import { ProductDto } from './dto/ProductDto';
import { ProductWithCategoryDto } from './dto/ProductWithCategoryDto';
import { ProductService } from './product.service';

@Controller('product')
@ApiTags('product')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Get products list',
        type: ProductWithCategoryDto,
    })
    @ApiBadRequestResponse({
        description: 'Error occurred during getting product list',
    })
    async getProductList(
        @Query() pageOptions: PageOptionsDto,
    ): Promise<ProductWithCategoryDto[]> {
        const products: ProductWithCategoryDto[] = await this.productService.getProductList(
            pageOptions,
        );
        return products;
    }

    @Post('add')
    @ApiBearerAuth()
    @UseGuards(AdminJwtAuthGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({
        description: 'Product was successfully added',
        type: ProductDto,
    })
    @ApiBadRequestResponse({
        description: 'Error occurred during adding product',
    })
    async addProduct(
        @Body() productAddDto: ProductAddDto,
    ): Promise<ProductDto> {
        const product: ProductDto = await this.productService.addProduct(
            productAddDto,
        );
        return product;
    }

    @Post('remove/:id')
    @ApiBearerAuth()
    @UseGuards(AdminJwtAuthGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiNoContentResponse({
        description: 'Product was successfully removed',
    })
    @ApiNotFoundResponse({
        description: 'The product was not found',
    })
    @ApiBadRequestResponse({
        description: 'Error occurred during removing product',
    })
    async removeProduct(@UUIDParam('id') productId: string): Promise<boolean> {
        const result: boolean = await this.productService.removeProduct(
            productId,
        );
        return result;
    }

    @Get('/productCategory')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get product category list',
        type: ProductCategoryListDto,
    })
    @ApiBadRequestResponse({
        description: 'Error occurred during getting product category list',
    })
    async getProductCategoryList(): Promise<ProductCategoryListDto[]> {
        const products: ProductCategoryListDto[] = await this.productService.getProductCategoryList();
        return products;
    }
}
