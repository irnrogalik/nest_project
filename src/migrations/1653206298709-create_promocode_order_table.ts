import type { MigrationInterface, QueryRunner } from 'typeorm';

export class createPromocodeOrderTable1653206298709
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS promocode_order
        (
            "id"            uuid              NOT NULL DEFAULT uuid_generate_v4(),
            "created_at"    TIMESTAMP         NOT NULL DEFAULT now(),
            "updated_at"    TIMESTAMP         NOT NULL DEFAULT now(),
            "order_id"      uuid,
            "promocode"     character varying DEFAULT NULL,
            PRIMARY KEY(id),
            CONSTRAINT fk_orderId_for_promocode
                FOREIGN KEY(order_id)
                    REFERENCES "order"(id)
                    ON DELETE SET NULL
        );
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE promocode_order;');
    }
}
