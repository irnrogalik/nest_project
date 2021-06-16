import type { MigrationInterface, QueryRunner } from 'typeorm';

export class createProductsTable1621975351516 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS product
            (
                "id"            uuid              NOT NULL DEFAULT uuid_generate_v4(),
                "created_at"    TIMESTAMP         NOT NULL DEFAULT now(),
                "updated_at"    TIMESTAMP         NOT NULL DEFAULT now(),
                "name"          character varying NOT NULL,
                "amount"        INT               NOT NULL,
                PRIMARY KEY(id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP TABLE product;');
    }
}
