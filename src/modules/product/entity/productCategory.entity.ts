import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity';
import { ProductCategoryDto } from '../dto/ProductCategoryDto';

@Entity({ name: 'productCategory' })
export class ProductCategoryEntity extends AbstractEntity<ProductCategoryDto> {
    @Column({
        type: 'uuid',
        name: 'product_id',
    })
    productId: string;

    @Column({
        type: 'uuid',
        name: 'category_id',
    })
    categoryId: string;

    dtoClass = ProductCategoryDto;
}
