import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Query,
    ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { PageDto } from '../../common/dto/PageDto';
import { TranslationService } from '../../shared/services/translation.service';
import type { ProductDto } from './dto/ProductDto';
import { ProductPageOptionsDto } from './dto/ProductPageOptionsDto';
import { ProductService } from './product.service';

@Controller('products')
@ApiTags('products')
export class ProductController {
    constructor(
        private productService: ProductService,
        private readonly translationService: TranslationService,
    ) {}

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
}
