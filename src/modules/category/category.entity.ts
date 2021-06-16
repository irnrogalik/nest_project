import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { CategoryDto } from './dto/CategoryDto';

@Entity({ name: 'category' })
export class CategoryEntity extends AbstractEntity<CategoryDto> {
    @Column()
    name: string;

    @Column({
        type: 'uuid',
        name: 'tax_id',
    })
    taxId: string;

    dtoClass = CategoryDto;
}
