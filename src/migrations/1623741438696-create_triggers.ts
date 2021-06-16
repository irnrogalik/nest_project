import type { MigrationInterface, QueryRunner } from 'typeorm';

export class createTriggers1623741438696 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION add_product_tax()
            RETURNS trigger AS
            $$
                DECLARE taxId uuid; isTheSameTax uuid;
                BEGIN
                    SELECT tax_id FROM category WHERE id = New.category_id and tax_id IS NOT NULL INTO taxId;
                        IF taxId IS NOT NULL THEN
                            SELECT tax_id FROM product_tax WHERE product_id = New.product_id and tax_id = taxId INTO isTheSameTax;
                                IF isTheSameTax IS NULL THEN
                                    INSERT INTO product_tax(product_id, tax_id) VALUES (New.product_id, taxId);
                                END IF;
                        END IF;
                    RETURN NULL;
                END;
            $$
            LANGUAGE plpgsql;
        `);
        await queryRunner.query(`
            CREATE TRIGGER trg_add_product_tax
            AFTER INSERT
            ON product_category FOR EACH ROW
            EXECUTE PROCEDURE add_product_tax();
        `);
    }
    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP FUNCTION add_product_tax() CASCADE;');
    }
}
