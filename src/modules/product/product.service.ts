import { Injectable } from '@nestjs/common';

import type { PageDto } from '../../common/dto/PageDto';
import { AwsS3Service } from '../../shared/services/aws-s3.service';
import { ValidatorService } from '../../shared/services/validator.service';
import type { ProductDto } from './dto/ProductDto';
import type { ProductPageOptionsDto } from './dto/ProductPageOptionsDto';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
    constructor(
        public readonly productRepository: ProductRepository,
        public readonly validatorService: ValidatorService,
        public readonly awsS3Service: AwsS3Service,
    ) {}

    async getProducts(
        pageOptionsDto: ProductPageOptionsDto,
    ): Promise<PageDto<ProductDto>> {
        const queryBuilder = this.productRepository.createQueryBuilder(
            'product',
        );
        const { items, pageMetaDto } = await queryBuilder.paginate(
            pageOptionsDto,
        );

        return items.toPageDto(pageMetaDto);
    }
}
