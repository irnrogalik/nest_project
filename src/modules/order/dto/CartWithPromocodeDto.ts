import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { ToLowerCase, Trim } from '../../../decorators/transforms.decorator';
import { CartDto } from './CartDto';

export class CartWithPromocodeDto {
    @ApiProperty({ type: [CartDto] })
    @IsArray()
    products: CartDto[];

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Trim()
    @ToLowerCase()
    @IsOptional()
    promocode?: string;
}
