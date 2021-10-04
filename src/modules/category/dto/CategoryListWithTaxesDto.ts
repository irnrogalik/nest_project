import { ApiPropertyOptional } from '@nestjs/swagger';

export class CategoryListWithTaxesDto {
    @ApiPropertyOptional()
    id: string;

    @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional()
    taxName: string;
}
