import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import type { CategoryEntity } from '../category.entity';

export class CategoryDto extends AbstractDto {
    @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional()
    taxId: string;

    constructor(category: CategoryEntity) {
        super(category);
        this.name = category.name;
        this.taxId = category.taxId;
    }
}
