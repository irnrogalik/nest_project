import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

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

    @ApiProperty()
    @IsArray()
    categories: string[];
}
