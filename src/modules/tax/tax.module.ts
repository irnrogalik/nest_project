import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaxController } from './tax.controller';
import { TaxRepository } from './tax.repository';
import { TaxService } from './tax.service';

@Module({
    imports: [TypeOrmModule.forFeature([TaxRepository])],
    controllers: [TaxController],
    exports: [TaxService],
    providers: [TaxService],
})
export class TaxModule {}
