import type { MigrationInterface, QueryRunner } from 'typeorm';

export class createProductTaxTable1623738620296 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS product_tax
            (
                "id"            uuid        NOT NULL DEFAULT uuid_generate_v4(),
                "created_at"    TIMESTAMP   NOT NULL DEFAULT now(),
                "updated_at"    TIMESTAMP   NOT NULL DEFAULT now(),
                "product_id"    uuid,
                "tax_id"        uuid,
                PRIMARY KEY(id),
                CONSTRAINT fk_product_id_for_product_tax
                    FOREIGN KEY(product_id)
                    REFERENCES product(id)
                    ON DELETE CASCADE,
                CONSTRAINT fk_tax_id_for_product_tax
                    FOREIGN KEY(tax_id)
                    REFERENCES tax(id)
                    ON DELETE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP TABLE product_tax;');
    }
}
