import { Expose } from 'class-transformer';
import { IsArray } from 'class-validator';

import { ToDecimal } from '../../../decorators/amount.decorator';
export class ProductInCartDto {
    id: string;
    name: string;

    @ToDecimal()
    amount: number;

    quantity: number;

    @IsArray()
    @Expose({ name: 'tax_value' })
    taxValue: number;
}
