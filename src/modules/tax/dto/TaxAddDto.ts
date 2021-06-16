import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

import { Trim } from '../../../decorators/transforms.decorator';

export class TaxAddDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Trim()
    name: string;

    @ApiProperty()
    @IsNumberString()
    @IsNotEmpty()
    @Trim()
    value: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Trim()
    description: string;
}
