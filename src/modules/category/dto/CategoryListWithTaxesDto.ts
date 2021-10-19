import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CategoryListWithTaxesDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiPropertyOptional()
    taxname: string;
}
