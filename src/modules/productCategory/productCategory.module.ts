import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductCategoryController } from './productCategory.controller';
import { ProductCategoryDtoRepository } from './productCategory.repository';
import { ProductCategoryService } from './productCategory.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProductCategoryDtoRepository])],
    controllers: [ProductCategoryController],
    exports: [ProductCategoryService],
    providers: [ProductCategoryService],
})
export class ProductCategoryModule {}
