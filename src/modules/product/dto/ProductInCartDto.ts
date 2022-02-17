import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsInt, IsOptional, Min } from 'class-validator';

import { ToDecimal } from '../../../decorators/amount.decorator';
export class ProductInCartDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    @ToDecimal()
    amount: number;

    @ApiPropertyOptional({
        minimum: 1,
        default: 1,
    })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @IsOptional()
    quantity = 1;

    @ApiProperty()
    @IsArray()
    @Expose({ name: 'tax_value' })
    taxValue: number[];
}
