import './boilerplate.polyfill';

import type { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PromocodeModule } from '../src/modules/promocode/promo.module';
import { contextMiddleware } from './middlewares';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { OrderModule } from './modules/order/order.module';
import { ProductModule } from './modules/product/product.module';
import { TaxModule } from './modules/tax/tax.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmConfigService } from './shared/services/type.orm.config.service';
import { SharedModule } from './shared/shared.module';

@Module({
    imports: [
        ProductModule,
        TaxModule,
        CategoryModule,
        OrderModule,
        UserModule,
        AuthModule,
        PromocodeModule,
        ConfigModule.forRoot({
            envFilePath: `${process.env.NODE_ENV || 'dev'}.env`,
        }),
        TypeOrmModule.forRootAsync({
            imports: [SharedModule],
            useFactory: (typeOrmConfigService: TypeOrmConfigService) =>
                typeOrmConfigService.get(),
            inject: [TypeOrmConfigService],
        }),
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
        consumer.apply(contextMiddleware).forRoutes('*');
    }
}
