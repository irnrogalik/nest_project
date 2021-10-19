import type { MigrationInterface, QueryRunner } from 'typeorm';

export class insertInitData1623824960264 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO product (id, name, amount)
            VALUES
                ('3ab7fed8-7270-482a-8e83-f2e4c6ae64cb', '16lb bag of Skittles', 1600),
                ('efd5dee6-81d4-4f03-8363-d8fd2fb394b5', 'Walkman', 9999),
                ('109a6e18-4a19-45a3-91d1-7ff2b092fb49', 'bag of microwave Popcorn', 099),
                ('cfd10d72-b4e8-4ea6-a65b-e381eb2c80be', 'imported bag of Vanilla-Hazelnut Coffee', 1100),
                ('c6245647-1c16-4ca8-9e01-629a75ae8b26', 'imported Vespa', 1500125),
                ('da4b9065-550d-47d8-a196-ad4461664bde', 'imported crate of Almond Snickers', 7599),
                ('db4b0381-f0b5-4e92-b1ca-a8cf593983f4', 'Discman', 5500),
                ('20e5412c-eb74-452a-a64d-8cfb095e169a', 'imported bottle of Wine', 1000),
                ('8261b4fc-9d24-494b-809e-e410f50c5f67', '300# bag of Fair-Trade Coffee', 99799);
        `);
        await queryRunner.query(`
            INSERT INTO tax (id, name, value, description)
            VALUES
                ('20bb00de-eda9-4014-994b-f54cd91b79f2', 'Basic sales', 10, 'Basic tax'),
                ('714578f7-43b3-46ec-9d4d-d18ccc043ad0', 'Import duty', 5, 'Import tax');
        `);
        await queryRunner.query(`
            INSERT INTO category (id, name, tax_id)
            VALUES
                ('4b89f36a-317f-49a2-8f69-7db670637206', 'Candy', null),
                ('eac116cf-a519-4f1f-b075-f24047d7c187', 'Coffee', null),
                ('d7e69861-c4b3-4f6d-ab85-bc79bacfa851', 'Popcorn', null),
                ('c7900ccb-deae-429a-b466-8f3b689913d0', 'Wine', '20bb00de-eda9-4014-994b-f54cd91b79f2'),
                ('023c9a54-a524-4eed-a859-0c3ee7e56b4f', 'Imported', '714578f7-43b3-46ec-9d4d-d18ccc043ad0'),
                ('b09ab6e7-ef86-44f9-84fb-d62daea2f449', 'Music device', '20bb00de-eda9-4014-994b-f54cd91b79f2'),
                ('7e682d25-c0a9-4df1-b91d-66f398fd8771', 'Device', '20bb00de-eda9-4014-994b-f54cd91b79f2');
        `);
        await queryRunner.query(`
            INSERT INTO product_category (product_id, category_id)
            VALUES
                ('3ab7fed8-7270-482a-8e83-f2e4c6ae64cb', '4b89f36a-317f-49a2-8f69-7db670637206'),
                ('efd5dee6-81d4-4f03-8363-d8fd2fb394b5', 'b09ab6e7-ef86-44f9-84fb-d62daea2f449'),
                ('109a6e18-4a19-45a3-91d1-7ff2b092fb49', 'd7e69861-c4b3-4f6d-ab85-bc79bacfa851'),
                ('cfd10d72-b4e8-4ea6-a65b-e381eb2c80be', 'eac116cf-a519-4f1f-b075-f24047d7c187'),
                ('cfd10d72-b4e8-4ea6-a65b-e381eb2c80be', '023c9a54-a524-4eed-a859-0c3ee7e56b4f'),
                ('c6245647-1c16-4ca8-9e01-629a75ae8b26', '7e682d25-c0a9-4df1-b91d-66f398fd8771'),
                ('c6245647-1c16-4ca8-9e01-629a75ae8b26', '023c9a54-a524-4eed-a859-0c3ee7e56b4f'),
                ('da4b9065-550d-47d8-a196-ad4461664bde', 'eac116cf-a519-4f1f-b075-f24047d7c187'),
                ('da4b9065-550d-47d8-a196-ad4461664bde', '023c9a54-a524-4eed-a859-0c3ee7e56b4f'),
                ('db4b0381-f0b5-4e92-b1ca-a8cf593983f4', 'b09ab6e7-ef86-44f9-84fb-d62daea2f449'),
                ('20e5412c-eb74-452a-a64d-8cfb095e169a', 'c7900ccb-deae-429a-b466-8f3b689913d0'),
                ('20e5412c-eb74-452a-a64d-8cfb095e169a', '023c9a54-a524-4eed-a859-0c3ee7e56b4f'),
                ('8261b4fc-9d24-494b-809e-e410f50c5f67', 'eac116cf-a519-4f1f-b075-f24047d7c187');
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM product;');
        await queryRunner.query('DELETE FROM tax;');
        await queryRunner.query('DELETE FROM category;');
        await queryRunner.query('DELETE FROM product_category;');
    }
}
