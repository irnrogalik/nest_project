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
    async getProductList(): Promise<ProductWithCategoryDto[]> {
        const products: ProductWithCategoryDto[] = await this.productService.getProductList();
        return products;
    }

    @Post('add')
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
    removeProduct(@UUIDParam('id') productId: string): Promise<void> {
        return this.productService.removeProduct(productId);
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
    getProductCategoryList(): Promise<ProductCategoryListDto[]> {
        return this.productService.getProductCategoryList();
    }
}
