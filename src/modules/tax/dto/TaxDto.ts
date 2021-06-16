import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import type { TaxEntity } from '../tax.entity';

export class TaxDto extends AbstractDto {
    @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional()
    value: number;

    @ApiPropertyOptional()
    description: string;

    constructor(tax: TaxEntity) {
        super(tax);
        this.name = tax.name;
        this.value = tax.value;
        this.description = tax.description;
    }
}
