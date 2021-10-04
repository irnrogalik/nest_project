import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { ToDecimal } from '../../../decorators/amount.decorator';

export class ProductWithCategoryDto {
    @ApiProperty()
    id: string;

    @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional()
    @ToDecimal()
    amount: number;

    @ApiPropertyOptional()
    categoryName: string[];
}
