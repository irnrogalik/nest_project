import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import type { ProductAddDto } from './dto/ProductAddDto';
import type { ProductCategoryDto } from './dto/ProductCategoryDto';
import { ProductEntity } from './entity/product.entity';

@EntityRepository(ProductEntity)
export class ProductRepository extends Repository<ProductEntity> {
    getProductList(): Promise<ProductEntity[]> {
        return this.query('SELECT * FROM getProductList();');
    }

    addProduct(productAddDto: ProductAddDto): Promise<ProductEntity> {
        return this.query(
            'INSERT INTO product (name, amount) VALUES ($1, $2) RETURNING *',
            [productAddDto.name, productAddDto.amount],
        );
    }

    removeProduct(productId: string): Promise<any> {
        return this.query('DELETE FROM product WHERE id = $1', [productId]);
    }

    getProductCategoryList() {
        return this.query(
            `SELECT product.id AS productId, product.name AS productName,
                array_agg(category.id) AS categoryId, array_agg(category.name) AS categoryName
            FROM product_category
            LEFT JOIN product ON product.id = product_category.product_id
            LEFT JOIN category ON category.id = product_category.category_id
            GROUP BY product.id;`,
        );
    }

    addProductIntoCategory(productCategoryDto: Partial<ProductCategoryDto>) {
        return this.query(
            'INSERT INTO product_category (product_id, category_id) VALUES ($1, $2) RETURNING *',
            [productCategoryDto.productId, productCategoryDto.categoryId],
        );
    }

    getProductTaxList() {
        return this.query(
            `SELECT product.id AS productId, product.name AS productName,
                array_agg(tax.id) AS taxId, array_agg(tax.name) AS taxName
            FROM product_tax
            LEFT JOIN product ON product.id = product_tax.product_id
            LEFT JOIN tax ON tax.id = product_tax.tax_id
            GROUP BY product.id;`,
        );
    }
}
