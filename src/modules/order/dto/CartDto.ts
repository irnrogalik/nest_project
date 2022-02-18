import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CartDto {
    @ApiProperty()
    @IsNotEmpty()
    id: string;

    @ApiProperty({
        minimum: 1,
        default: 1,
    })
    @IsInt()
    @Min(1)
    quantity: number;
}
