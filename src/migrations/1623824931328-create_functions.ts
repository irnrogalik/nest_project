import type { MigrationInterface, QueryRunner } from 'typeorm';

export class createFunctions1623824931328 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION getProductsListInCart(IN idList uuid[])
            RETURNS TABLE ( id uuid, name character varying, amount int, tax_value int[])
            LANGUAGE SQL
            as $$
                SELECT product.id, product.name, product.amount, array_agg(tax.value) as tax_value
                FROM product
                    LEFT JOIN product_tax on product.id = product_tax.product_id
                    LEFT JOIN tax on product_tax.tax_id = tax.id
                WHERE product.id = any (idList)
                GROUP BY product.id, product.name
                ;
            $$;
        `);
        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION getProductList ()
            RETURNS TABLE ( id uuid, name character varying, amount int, categoryName text[])
            LANGUAGE SQL
            as $$
                SELECT product.id, product.name, product.amount, array_agg(category.name) as categoryName
                FROM product
                    LEFT JOIN product_category ON product.id = product_category.product_id
                    LEFT JOIN category on product_category.category_id = category.id
                GROUP BY product.id, product.name, product.amount;
            $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP FUNCTION getProductsListInCart();');
        await queryRunner.query('DROP FUNCTION getProductList();');
    }
}
