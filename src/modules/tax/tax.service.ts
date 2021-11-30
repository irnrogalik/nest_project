import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import type { PageOptionsDto } from '../../common/dto/PageOptionsDto';
import type { TaxAddDto } from './dto/TaxAddDto';
import type { TaxDto } from './dto/TaxDto';
import type { TaxEntity } from './tax.entity';
import { TaxRepository } from './tax.repository';

@Injectable()
export class TaxService {
    constructor(public readonly taxRepository: TaxRepository) {}

    async getFullTaxes(pageOptions: PageOptionsDto): Promise<TaxDto[]> {
        const taxes: TaxEntity[] = await this.taxRepository.getFullTaxes(
            pageOptions,
        );
        return taxes.toDtos();
    }

    async getTaxes(): Promise<TaxDto[]> {
        const taxes: TaxEntity[] = await this.taxRepository.getTaxes();
        return taxes.toDtos();
    }

    async addTax(taxAddDto: TaxAddDto): Promise<TaxDto> {
        const tax: TaxEntity = await this.taxRepository.addTax(taxAddDto);
        if (!tax) {
            throw new BadRequestException(
                `The tax ${taxAddDto.name} was not created`,
            );
        }
        return tax.toDto();
    }

    async removeTax(taxId: string): Promise<boolean> {
        if (!(await this.taxRepository.removeTax(taxId))) {
            throw new NotFoundException(`The tax with id ${taxId} not found.`);
        }
        return true;
    }
}
