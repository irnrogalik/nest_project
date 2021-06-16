import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { TaxDto } from './dto/TaxDto';

@Entity({ name: 'tax' })
export class TaxEntity extends AbstractEntity<TaxDto> {
    @Column()
    name: string;

    @Column()
    value: number;

    @Column()
    description: string;

    dtoClass = TaxDto;
}
