import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';

import { Trim } from '../../../decorators/transforms.decorator';

export class ProductCategoryAddDto {
    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    @Trim()
    productId: string;

    @ApiProperty()
    @IsArray()
    categories: string[];
}
