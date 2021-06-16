import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import type { ProductTaxEntity } from '../productTax.entity';

export class ProductTaxDto extends AbstractDto {
    @ApiPropertyOptional()
    productId: string;

    @ApiPropertyOptional()
    taxId: string;

    constructor(productTax: ProductTaxEntity) {
        super(productTax);
        this.productId = productTax.productId;
        this.taxId = productTax.taxId;
    }
}
