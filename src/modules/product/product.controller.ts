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
import { ProductCategoryAddDto } from './dto/ProductCategoryAddDto';
import type { ProductCategoryDto } from './dto/ProductCategoryDto';
import { ProductDto } from './dto/ProductDto';
import type { ProductTaxDto } from './dto/ProductTaxDto';
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

    @Post('/productCategory/add')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Add product into category',
        type: PageDto,
    })
    addProductIntoCategory(
        @Body() productCategoryAddDto: ProductCategoryAddDto,
    ): Promise<ProductCategoryDto> {
        return this.productService.addProductIntoCategory(
            productCategoryAddDto,
        );
    }

    @Get('/productTax')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get productTax list',
        type: PageDto,
    })
    getProductTaxList(): Promise<PageDto<ProductTaxDto>> {
        return this.productService.getProductTaxList();
    }
}
