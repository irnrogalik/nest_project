import type { MigrationInterface, QueryRunner } from 'typeorm';

export class createUserTable1640069112316 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "user"
            (
                "id"            uuid              NOT NULL DEFAULT uuid_generate_v4(),
                "created_at"    TIMESTAMP         NOT NULL DEFAULT now(),
                "updated_at"    TIMESTAMP         NOT NULL DEFAULT now(),
                "name"          character varying NOT NULL,
                "email"         character varying NOT NULL,
                "password"      character varying NOT NULL,
                "phone"         character varying NOT NULL,
                "address"       character varying NOT NULL,
                PRIMARY KEY(id),
                CONSTRAINT email_unique UNIQUE (email)
            );
        `);
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS user_role
            (
                "id"            uuid              NOT NULL DEFAULT uuid_generate_v4(),
                "created_at"    TIMESTAMP         NOT NULL DEFAULT now(),
                "updated_at"    TIMESTAMP         NOT NULL DEFAULT now(),
                "role"          character varying NOT NULL,
                "user_id"       uuid,
                PRIMARY KEY(id),
                CONSTRAINT fk_userId_for_user_role
                    FOREIGN KEY(user_id)
                        REFERENCES "user"(id)
                        ON DELETE SET NULL
            );
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
                ADD COLUMN user_id uuid,
                ADD FOREIGN KEY (user_id)
                    REFERENCES "user"(id)
                    ON DELETE SET NULL;
        `);
        await queryRunner.query(`
        INSERT INTO "user" (id, name, email, password, phone, address)
        VALUES
            ('41e4b9c3-1fd8-4fc6-a674-1065595dd332', 'admin', 'admin@admin.com', 'password', '375330000000', 'Minsk');
        `);
        await queryRunner.query(`
        INSERT INTO "user_role" (id, role, user_id)
        VALUES
            ('c93f22bd-ccbb-4971-a207-617a458da12b', 'admin', '41e4b9c3-1fd8-4fc6-a674-1065595dd332');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP TABLE "user";');
        await queryRunner.query('DROP TABLE user_role;');
    }
}
