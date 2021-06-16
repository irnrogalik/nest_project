import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

import { Trim } from '../../../decorators/transforms.decorator';

export class CategoryAddDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Trim()
    name: string;

    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    @Trim()
    taxId: string;
}
