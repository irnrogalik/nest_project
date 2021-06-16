import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { TaxEntity } from './tax.entity';

@EntityRepository(TaxEntity)
export class TaxRepository extends Repository<TaxEntity> {}
