import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PageDto } from '../../common/dto/PageDto';
import { UUIDParam } from '../../decorators/uuid.decorators';
import { ProductAddDto } from './dto/ProductAddDto';
import { ProductDto } from './dto/ProductDto';
import type { ProductEntity } from './product.entity';
import { ProductService } from './product.service';

@Controller('product')
@ApiTags('product')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get products list',
        type: PageDto,
    })
    getProductList(): Promise<PageDto<ProductDto>> {
        return this.productService.getProductList();
    }

    @Post('add')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: ProductDto,
        description: 'Product was successfully added',
    })
    async addProduct(
        @Body() productAddDto: ProductAddDto,
    ): Promise<ProductDto> {
        const product: ProductEntity = await this.productService.addProduct(
            productAddDto,
        );
        return product;
    }

    @Delete('remove/:id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: ProductDto,
        description: 'Product was successfully removed',
    })
    removeProduct(@UUIDParam('id') productId: string): Promise<ProductDto> {
        return this.productService.removeProduct(productId);
    }
}
