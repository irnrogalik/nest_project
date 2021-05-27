import type { MigrationInterface, QueryRunner } from 'typeorm';

export class createProductsTable1621975351516 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "products"
            (
                "id"            uuid              NOT NULL DEFAULT uuid_generate_v4(),
                "created_at"    TIMESTAMP         NOT NULL DEFAULT now(),
                "updated_at"    TIMESTAMP         NOT NULL DEFAULT now(),
                "name"          character varying NOT NULL,
                "amount"        INT    NOT NULL
            )`);
        await queryRunner.query(`
            INSERT INTO "products" (name, amount)
            VALUES
                ('6lb bag of Skittles', 1600),
                ('Walkman', 9999),
                ('Popcorn', 099),
                ('Vanilla-Hazelnut Coffee', 1100),
                ('Vespa', 1500125),
                ('crate of Almond Snickers', 7599),
                ('Discman', 5500),
                ('Bottle of Wine', 1000),
                ('300# bag of Fair-Trade Coffee', 99799);
            `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP TABLE "products"');
    }
}
