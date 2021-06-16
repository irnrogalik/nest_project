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
import { ProductCategoryAddDto } from './dto/ProductCategoryAddDto';
import type { ProductCategoryDto } from './dto/ProductCategoryDto';
import { ProductCategoryService } from './productCategory.service';

@Controller('productCategory')
@ApiTags('productCategory')
export class ProductCategoryController {
    constructor(private productCategoryService: ProductCategoryService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get productCategory list',
        type: PageDto,
    })
    getProductCategoryList(): Promise<PageDto<ProductCategoryDto>> {
        return this.productCategoryService.getProductCategoryList();
    }

    @Post('add')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Add product into category',
        type: PageDto,
    })
    addProductIntoCategory(
        @Body() productCategoryAddDto: ProductCategoryAddDto,
    ): Promise<ProductCategoryDto> {
        return this.productCategoryService.addProductIntoCategory(
            productCategoryAddDto,
        );
    }
}
