import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

import { ToDecimal } from '../../../decorators/amount.decorator';

export class ProductInCartDto {
    @ApiPropertyOptional()
    id: string;

    @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional()
    @ToDecimal()
    amount: number;

    @ApiPropertyOptional()
    @ToDecimal()
    quantity: number;

    @ApiPropertyOptional()
    @IsArray()
    tax_value: number;
}
