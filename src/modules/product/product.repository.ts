import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import type { PageOptionsDto } from '../../common/dto/PageOptionsDto';
import { paginate } from '../../shared/functions';
import type { ProductAddDto } from './dto/ProductAddDto';
import type { ProductCategoryDto } from './dto/ProductCategoryDto';
import { ProductCategoryListDto } from './dto/ProductCategoryListDto';
import { ProductTaxListDto } from './dto/ProductTaxListDto';
import { ProductWithCategoryDto } from './dto/ProductWithCategoryDto';
import { ProductEntity } from './entity/product.entity';

@EntityRepository(ProductEntity)
export class ProductRepository extends Repository<ProductEntity> {
    async getProductList(
        pageOptions: PageOptionsDto,
    ): Promise<ProductWithCategoryDto[]> {
        const products: ProductWithCategoryDto[] = await this.query(
            paginate(
                'SELECT * FROM getProductList()',
                pageOptions.page,
                pageOptions.take,
            ),
        );
        return plainToClass(ProductWithCategoryDto, products);
    }

    async addProduct(productAddDto: ProductAddDto): Promise<ProductEntity> {
        const product = await this.query(
            'INSERT INTO product (name, amount) VALUES ($1, $2) RETURNING *',
            [productAddDto.name, productAddDto.amount],
        );
        return plainToClass(ProductEntity, product[0]);
    }

    async removeProduct(productId: string): Promise<boolean> {
        const result: [
            [],
            boolean,
        ] = await this.query('DELETE FROM product WHERE id = $1', [productId]);
        return result[1];
    }

    async getProductCategoryList(): Promise<ProductCategoryListDto[]> {
        const productCategoryList: ProductCategoryListDto[] = await this.query(
            `SELECT product.id AS productId, product.name AS productName,
                array_agg(category.id) AS categoryId, array_agg(category.name) AS categoryName
            FROM product_category
            LEFT JOIN product ON product.id = product_category.product_id
            LEFT JOIN category ON category.id = product_category.category_id
            GROUP BY product.id;`,
        );
        return plainToClass(ProductCategoryListDto, productCategoryList);
    }

    async addProductIntoCategory(
        productCategoryDto: Partial<ProductCategoryDto>,
    ): Promise<boolean> {
        const productCategory: ProductCategoryDto[] = await this.query(
            'INSERT INTO product_category (product_id, category_id) VALUES ($1, $2) RETURNING *',
            [productCategoryDto.productId, productCategoryDto.categoryId],
        );
        return productCategory[0] ? true : false;
    }

    async getProductTaxList(): Promise<ProductTaxListDto[]> {
        const list: ProductTaxListDto[] = await this.query(
            `SELECT product.id AS productId, product.name AS productName,
                array_agg(tax.id) AS taxId, array_agg(tax.name) AS taxName
            FROM product_tax
            LEFT JOIN product ON product.id = product_tax.product_id
            LEFT JOIN tax ON tax.id = product_tax.tax_id
            GROUP BY product.id;`,
        );
        return plainToClass(ProductTaxListDto, list);
    }
}
