import { ApiProperty } from '@nestjs/swagger';
export class CartDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    quantity: number;
}
