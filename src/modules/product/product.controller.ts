import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PageDto } from '../../common/dto/PageDto';
import { UUIDParam } from '../../decorators/uuid.decorators';
import { ProductAddDto } from './dto/ProductAddDto';
import type { ProductCategoryAddDto } from './dto/ProductCategoryAddDto';
import type { ProductCategoryDto } from './dto/ProductCategoryDto';
import { ProductDto } from './dto/ProductDto';
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
    getProductList(): Promise<ProductDto[]> {
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
        const product: ProductDto = await this.productService.addProduct(
            productAddDto,
        );
        if (
            product &&
            productAddDto.categories &&
            productAddDto.categories.length > 0
        ) {
            const productCategoryAddDto: ProductCategoryAddDto = {
                productId: product[0].id,
                categories: productAddDto.categories,
            };
            await this.productService.addProductIntoCategory(
                productCategoryAddDto,
            );
        }
        return product;
    }

    @Post('remove/:id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: ProductDto,
        description: 'Product was successfully removed',
    })
    removeProduct(@UUIDParam('id') productId: string): Promise<ProductDto> {
        return this.productService.removeProduct(productId);
    }

    @Get('/productCategory')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get productCategory list',
        type: PageDto,
    })
    getProductCategoryList(): Promise<PageDto<ProductCategoryDto>> {
        return this.productService.getProductCategoryList();
    }
}
