import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import type { ProductCategoryEntity } from '../entity/productCategory.entity';

export class ProductCategoryDto extends AbstractDto {
    @ApiPropertyOptional()
    productId: string;

    @ApiPropertyOptional()
    categoryId: string;

    constructor(productCategory: ProductCategoryEntity) {
        super(productCategory);
        this.productId = productCategory.productId;
        this.categoryId = productCategory.categoryId;
    }
}
