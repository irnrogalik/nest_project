import './boilerplate.polyfill';

import type { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { contextMiddleware } from './middlewares';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { ProductCategoryModule } from './modules/productCategory/productCategory.module';
import { ProductTaxModule } from './modules/productTax/productTax.module';
import { TaxModule } from './modules/tax/tax.module';
import { ConfigService } from './shared/services/config.service';
import { SharedModule } from './shared/shared.module';

@Module({
    imports: [
        ProductModule,
        TaxModule,
        CategoryModule,
        ProductCategoryModule,
        ProductTaxModule,
        TypeOrmModule.forRootAsync({
            imports: [SharedModule],
            useFactory: (configService: ConfigService) =>
                configService.typeOrmConfig,
            inject: [ConfigService],
        }),
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
        consumer.apply(contextMiddleware).forRoutes('*');
    }
}
