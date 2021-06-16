import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { PageDto } from '../../common/dto/PageDto';
import type { ProductTaxDto } from './dto/ProductTaxDto';
import { ProductTaxService } from './productTax.service';

@Controller('productTax')
@ApiTags('productTax')
export class ProductTaxController {
    constructor(private productTaxService: ProductTaxService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get productTax list',
        type: PageDto,
    })
    getProductTaxList(): Promise<PageDto<ProductTaxDto>> {
        return this.productTaxService.getProductTaxList();
    }
}
