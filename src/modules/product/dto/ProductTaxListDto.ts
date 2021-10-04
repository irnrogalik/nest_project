import { ApiPropertyOptional } from '@nestjs/swagger';

export class ProductTaxListDto {
    @ApiPropertyOptional()
    productId: string;

    @ApiPropertyOptional()
    productName: string;

    @ApiPropertyOptional()
    taxId: string[];

    @ApiPropertyOptional()
    taxName: string[];
}
