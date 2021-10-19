import { ApiProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { ToDecimal } from '../../../decorators/amount.decorator';
import type { ProductEntity } from '../entity/product.entity';

export class ProductDto extends AbstractDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    @ToDecimal()
    amount: number;

    constructor(product: ProductEntity) {
        super(product);
        this.name = product.name;
        this.amount = product.amount;
    }
}
