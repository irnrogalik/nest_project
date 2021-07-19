import type { MigrationInterface, QueryRunner } from 'typeorm';

export class createCategoryTable1623311534917 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS category
            (
                "id"            uuid              NOT NULL DEFAULT uuid_generate_v4(),
                "created_at"    TIMESTAMP         NOT NULL DEFAULT now(),
                "updated_at"    TIMESTAMP         NOT NULL DEFAULT now(),
                "name"          character varying NOT NULL,
                "tax_id"        uuid,
                PRIMARY KEY(id),
                CONSTRAINT fk_taxId_for_category
                    FOREIGN KEY(tax_id)
                    REFERENCES tax(id)
                    ON DELETE SET NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP TABLE category;');
    }
}
