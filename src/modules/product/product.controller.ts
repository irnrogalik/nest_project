import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Query,
    ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PageDto } from '../../common/dto/PageDto';
import { ProductAddDto } from './dto/ProductAddDto';
import { ProductDto } from './dto/ProductDto';
import { ProductPageOptionsDto } from './dto/ProductPageOptionsDto';
import { ProductService } from './product.service';

@Controller('products')
@ApiTags('products')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get products list',
        type: PageDto,
    })
    getProducts(
        @Query(new ValidationPipe({ transform: true }))
        pageOptionsDto: ProductPageOptionsDto,
    ): Promise<PageDto<ProductDto>> {
        return this.productService.getProducts(pageOptionsDto);
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
        const product = await this.productService.addProduct(productAddDto);
        return product.toDto();
    }
}
