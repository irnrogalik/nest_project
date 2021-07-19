import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { Trim } from '../../../decorators/transforms.decorator';

export class CategoryAddDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Trim()
    name: string;

    @ApiPropertyOptional()
    @IsOptional()
    taxId: string;
}
