import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { ProductCategoryEntity } from './productCategory.entity';

@EntityRepository(ProductCategoryEntity)
export class ProductCategoryDtoRepository extends Repository<ProductCategoryEntity> {}
