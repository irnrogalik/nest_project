import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { ToInteger } from '../../../decorators/amount.decorator';
import { Trim } from '../../../decorators/transforms.decorator';

export class ProductAddDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Trim()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @Trim()
    @ToInteger()
    amount: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsArray()
    categories: string[];
}
