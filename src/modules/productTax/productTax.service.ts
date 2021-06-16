import { Injectable } from '@nestjs/common';

import type { PageDto } from '../../common/dto/PageDto';
import type { ProductTaxDto } from './dto/ProductTaxDto';
import { ProductTaxRepository } from './productTax.repository';

@Injectable()
export class ProductTaxService {
    constructor(public readonly productTaxRepository: ProductTaxRepository) {}

    async getProductTaxList(): Promise<PageDto<ProductTaxDto>> {
        const list = await this.productTaxRepository.query(
            `SELECT product.id AS productId, product.name AS productName,
                array_agg(tax.id) AS taxId, array_agg(tax.name) AS taxName
            FROM product_tax
            LEFT JOIN product ON product.id = product_tax.product_id
            LEFT JOIN tax ON tax.id = product_tax.tax_id
            GROUP BY product.id;`,
        );
        return list;
    }
}
