import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import type { PageOptionsDto } from '../../common/dto/PageOptionsDto';
import { paginate } from '../../shared/functions';
import type { TaxAddDto } from './dto/TaxAddDto';
import { TaxEntity } from './tax.entity';

@EntityRepository(TaxEntity)
export class TaxRepository extends Repository<TaxEntity> {
    async getFullTaxes(pageOptions: PageOptionsDto): Promise<TaxEntity[]> {
        const taxes: TaxEntity[] = await this.query(
            paginate('SELECT * FROM tax', pageOptions),
        );
        return plainToInstance(TaxEntity, taxes);
    }

    async getTaxes(): Promise<Partial<TaxEntity[]>> {
        const taxes: TaxEntity[] = await this.query('SELECT * FROM getTaxes');
        return plainToInstance(TaxEntity, taxes);
    }

    async addTax(taxAddDto: TaxAddDto): Promise<TaxEntity> {
        const tax: TaxEntity[] = await this.query(
            'INSERT INTO tax (name, value, description) VALUES ($1, $2, $3) RETURNING *',
            [taxAddDto.name, taxAddDto.value, taxAddDto.description],
        );
        return plainToInstance(TaxEntity, tax[0]);
    }

    async removeTax(taxId: string): Promise<boolean> {
        const result: [
            [],
            boolean,
        ] = await this.query('DELETE FROM tax WHERE id = $1', [taxId]);
        return result[1];
    }
}
