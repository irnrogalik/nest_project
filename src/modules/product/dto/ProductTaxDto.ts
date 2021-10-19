import { ApiProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import type { ProductTaxEntity } from '../entity/productTax.entity';

export class ProductTaxDto extends AbstractDto {
    @ApiProperty()
    productId: string;

    @ApiProperty()
    taxId: string;

    constructor(productTax: ProductTaxEntity) {
        super(productTax);
        this.productId = productTax.productId;
        this.taxId = productTax.taxId;
    }
}
