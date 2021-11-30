import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PageOptionsDto {
    @ApiPropertyOptional({
        minimum: 0,
        default: 1,
    })
    @Type(() => Number)
    @IsInt()
    @IsOptional()
    readonly page: number = 1;

    @ApiPropertyOptional({
        minimum: 5,
        maximum: 50,
        default: 10,
    })
    @Type(() => Number)
    @IsInt()
    @Min(5)
    @Max(50)
    @IsOptional()
    readonly take: number = 10;
}
