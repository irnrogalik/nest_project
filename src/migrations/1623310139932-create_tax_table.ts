import type { MigrationInterface, QueryRunner } from 'typeorm';

export class createTaxTable1623310139932 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS tax
            (
                "id"            uuid              NOT NULL DEFAULT uuid_generate_v4(),
                "created_at"    TIMESTAMP         NOT NULL DEFAULT now(),
                "updated_at"    TIMESTAMP         NOT NULL DEFAULT now(),
                "name"          character varying NOT NULL,
                "value"         INT               NOT NULL,
                "description"   character varying NOT NULL,
                PRIMARY KEY(id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP TABLE tax;');
    }
}
