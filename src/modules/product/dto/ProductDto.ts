import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { ToDecimal } from '../../../decorators/amount.decorator';
import type { ProductEntity } from '../entity/product.entity';

export class ProductDto extends AbstractDto {
    @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional()
    @ToDecimal()
    amount: number;

    constructor(product: ProductEntity) {
        super(product);
        this.name = product.name;
        this.amount = product.amount;
    }
}
