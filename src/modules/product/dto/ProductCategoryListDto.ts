import { ApiProperty } from '@nestjs/swagger';

export class ProductCategoryListDto {
    @ApiProperty()
    productid: string;

    @ApiProperty()
    categoryid: string[];

    @ApiProperty()
    productname: string;

    @ApiProperty()
    categoryname: string[];
}
