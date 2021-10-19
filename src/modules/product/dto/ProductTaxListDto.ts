import { ApiProperty } from '@nestjs/swagger';

export class ProductTaxListDto {
    @ApiProperty()
    productId: string;

    @ApiProperty()
    productName: string;

    @ApiProperty()
    taxId: string[];

    @ApiProperty()
    taxName: string[];
}
