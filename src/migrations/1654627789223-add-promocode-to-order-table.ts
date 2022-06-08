import type { MigrationInterface, QueryRunner } from 'typeorm';

export class addPromocodeToOrderTable1654627789223
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE IF EXISTS promocode_order;');
        await queryRunner.query(`
        ALTER TABLE "order"
            ADD COLUMN IF NOT EXISTS promocode character varying DEFAULT NULL
        `);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async down(queryRunner: QueryRunner): Promise<void> {}
}
