import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { ProductTaxEntity } from './productTax.entity';

@EntityRepository(ProductTaxEntity)
export class ProductTaxRepository extends Repository<ProductTaxEntity> {}
