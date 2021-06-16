import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductTaxController } from './productTax.controller';
import { ProductTaxRepository } from './productTax.repository';
import { ProductTaxService } from './productTax.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProductTaxRepository])],
    controllers: [ProductTaxController],
    exports: [ProductTaxService],
    providers: [ProductTaxService],
})
export class ProductTaxModule {}
