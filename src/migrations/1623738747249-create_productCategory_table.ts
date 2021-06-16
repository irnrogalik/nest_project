import type { MigrationInterface, QueryRunner } from 'typeorm';

export class createProductCategoryTable1623738747249
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS product_category
            (
                "id"            uuid        NOT NULL DEFAULT uuid_generate_v4(),
                "created_at"    TIMESTAMP   NOT NULL DEFAULT now(),
                "updated_at"    TIMESTAMP   NOT NULL DEFAULT now(),
                "product_id"    uuid,
                "category_id"   uuid,
                PRIMARY KEY(id),
                CONSTRAINT fk_product_id_for_product_category
                    FOREIGN KEY(product_id)
                    REFERENCES product(id)
                    ON DELETE CASCADE,
                CONSTRAINT fk_category_id_for_product_category
                    FOREIGN KEY(category_id)
                    REFERENCES category(id)
                    ON DELETE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP TABLE product_category;');
    }
}
