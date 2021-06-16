import { Injectable } from '@nestjs/common';

import type { PageDto } from '../../common/dto/PageDto';
import type { TaxAddDto } from './dto/TaxAddDto';
import type { TaxDto } from './dto/TaxDto';
import type { TaxEntity } from './tax.entity';
import { TaxRepository } from './tax.repository';

@Injectable()
export class TaxService {
    constructor(public readonly taxRepository: TaxRepository) {}

    async getFullTaxes(): Promise<PageDto<TaxDto>> {
        const taxes = await this.taxRepository.query('SELECT * FROM tax');
        return taxes;
    }

    async getTaxes(): Promise<PageDto<TaxDto>> {
        const taxes = await this.taxRepository.query('SELECT * FROM getTaxes');
        return taxes;
    }

    async addTax(taxAddDto: TaxAddDto): Promise<TaxEntity> {
        try {
            const tax: TaxEntity = await this.taxRepository.query(
                'INSERT INTO tax (name, value, description) VALUES ($1, $2, $3) RETURNING *',
                [taxAddDto.name, taxAddDto.value, taxAddDto.description],
            );
            return tax;
        } catch (e) {
            throw new Error(e);
        }
    }

    async removeTax(taxId: string): Promise<any> {
        try {
            return await this.taxRepository.query(
                'DELETE FROM tax WHERE id = $1',
                [taxId],
            );
        } catch (e) {
            throw new Error(e);
        }
    }
}
