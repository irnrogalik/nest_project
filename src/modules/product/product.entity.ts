import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { ProductDto } from './dto/ProductDto';

@Entity({ name: 'product' })
export class ProductEntity extends AbstractEntity<ProductDto> {
    @Column()
    name: string;

    @Column()
    amount: number;

    dtoClass = ProductDto;
}
