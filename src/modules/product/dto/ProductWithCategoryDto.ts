import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { ToDecimal } from '../../../decorators/amount.decorator';

export class ProductWithCategoryDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    @ToDecimal()
    amount: number;

    @ApiPropertyOptional()
    categoryname: string[];
}
