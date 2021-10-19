import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsArray } from 'class-validator';

import { ToDecimal } from '../../../decorators/amount.decorator';
export class ProductInCartDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    @ToDecimal()
    amount: number;

    // quantity: number;

    @ApiProperty()
    @IsArray()
    @Expose({ name: 'tax_value' })
    taxValue: number[];
}
