import { Injectable } from '@nestjs/common';

import type { TaxAddDto } from './dto/TaxAddDto';
import type { TaxDto } from './dto/TaxDto';
import type { TaxEntity } from './tax.entity';
import { TaxRepository } from './tax.repository';

@Injectable()
export class TaxService {
    constructor(public readonly taxRepository: TaxRepository) {}

    async getFullTaxes(): Promise<TaxDto[]> {
        try {
            return await this.taxRepository.getFullTaxes();
        } catch (e) {
            throw new Error(e);
        }
    }

    async getTaxes(): Promise<TaxDto[]> {
        try {
            return await this.taxRepository.getTaxes();
        } catch (e) {
            throw new Error(e);
        }
    }

    async addTax(taxAddDto: TaxAddDto): Promise<TaxEntity> {
        try {
            return await this.taxRepository.addTax(taxAddDto);
        } catch (e) {
            throw new Error(e);
        }
    }

    async removeTax(taxId: string): Promise<any> {
        try {
            return await this.taxRepository.removeTax(taxId);
        } catch (e) {
            throw new Error(e);
        }
    }
}
