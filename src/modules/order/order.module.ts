import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PromocodeModule } from '../promocode/promo.module';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';

@Module({
    imports: [TypeOrmModule.forFeature([OrderRepository]), PromocodeModule],
    controllers: [OrderController],
    exports: [OrderService],
    providers: [OrderService],
})
export class OrderModule {}
