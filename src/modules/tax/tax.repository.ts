import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import type { TaxAddDto } from './dto/TaxAddDto';
import { TaxEntity } from './tax.entity';

@EntityRepository(TaxEntity)
export class TaxRepository extends Repository<TaxEntity> {
    getFullTaxes(): Promise<TaxEntity[]> {
        return this.query('SELECT * FROM tax');
    }

    getTaxes(): Promise<TaxEntity[]> {
        return this.query('SELECT * FROM getTaxes');
    }

    addTax(taxAddDto: TaxAddDto): Promise<TaxEntity> {
        return this.query(
            'INSERT INTO tax (name, value, description) VALUES ($1, $2, $3) RETURNING *',
            [taxAddDto.name, taxAddDto.value, taxAddDto.description],
        );
    }

    async removeTax(taxId: string): Promise<any> {
        return this.query('DELETE FROM tax WHERE id = $1', [taxId]);
    }
}
