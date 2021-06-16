import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { ProductTaxDto } from './dto/ProductTaxDto';

@Entity({ name: 'productTax' })
export class ProductTaxEntity extends AbstractEntity<ProductTaxDto> {
    @Column({
        type: 'uuid',
        name: 'product_id',
    })
    productId: string;

    @Column({
        type: 'uuid',
        name: 'tax_id',
    })
    taxId: string;

    dtoClass = ProductTaxDto;
}
