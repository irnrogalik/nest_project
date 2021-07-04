import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

import { Trim } from '../../../decorators/transforms.decorator';

export class ProductCategoryAddDto {
    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    @Trim()
    productId: string;

    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    @Trim()
    categoryId: string;
}
