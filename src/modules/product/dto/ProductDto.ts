import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import type { ProductEntity } from '../product.entity';

export class ProductDto extends AbstractDto {
    @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional()
    amount: number;

    constructor(product: ProductEntity) {
        super(product);
        this.name = product.name;
        this.amount = product.amount;
    }
}
