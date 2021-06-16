import type { MigrationInterface, QueryRunner } from 'typeorm';

export class createViews1623823355533 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE VIEW getTaxes AS
                SELECT id, name
                FROM tax;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP VIEW getTaxes;');
    }
}
