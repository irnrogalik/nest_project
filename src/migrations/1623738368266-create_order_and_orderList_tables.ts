import type { MigrationInterface, QueryRunner } from 'typeorm';

export class createOrderAndOrderListTables1623738368266
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "order"
            (
                "id"            uuid        NOT NULL DEFAULT uuid_generate_v4(),
                "created_at"    TIMESTAMP   NOT NULL DEFAULT now(),
                "updated_at"    TIMESTAMP   NOT NULL DEFAULT now(),
                "orderTax"    INT         NOT NULL,
                "total"         INT         NOT NULL,
                PRIMARY KEY(id)
            );
        `);
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS order_list
            (
                "id"            uuid        NOT NULL DEFAULT uuid_generate_v4(),
                "created_at"    TIMESTAMP   NOT NULL DEFAULT now(),
                "updated_at"    TIMESTAMP   NOT NULL DEFAULT now(),
                "quantity"      INT DEFAULT 1,
                "order_id"         uuid,
                "product_id"         uuid,
                PRIMARY KEY(id),
                CONSTRAINT fk_order_id_for_order_list
                    FOREIGN KEY(order_id)
                    REFERENCES "order"(id)
                    ON DELETE CASCADE,
                CONSTRAINT fk_product_id_for_order_list
                    FOREIGN KEY(product_id)
                    REFERENCES product(id)
                    ON DELETE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP TABLE "order";');
        await queryRunner.query('DROP TABLE order_list;');
    }
}
