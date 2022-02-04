import type { MigrationInterface, QueryRunner } from 'typeorm';

import { Role } from '../common/model';

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
                "address"       character varying DEFAULT NULL,
                PRIMARY KEY(id),
                CONSTRAINT email_unique UNIQUE (email)
            );
        `);
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS role
            (
                "id"            uuid              NOT NULL DEFAULT uuid_generate_v4(),
                "created_at"    TIMESTAMP         NOT NULL DEFAULT now(),
                "updated_at"    TIMESTAMP         NOT NULL DEFAULT now(),
                "name"          character varying NOT NULL,
                PRIMARY KEY(id),
                CONSTRAINT role_name_unique UNIQUE (name)
            );
        `);
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS user_role
            (
                "id"            uuid              NOT NULL DEFAULT uuid_generate_v4(),
                "created_at"    TIMESTAMP         NOT NULL DEFAULT now(),
                "updated_at"    TIMESTAMP         NOT NULL DEFAULT now(),
                "user_id"       uuid,
                "role_id"       uuid,
                PRIMARY KEY(id),
                CONSTRAINT fk_userId_for_user_role
                    FOREIGN KEY(user_id)
                        REFERENCES "user"(id)
                        ON DELETE SET NULL,
                CONSTRAINT fk_roleId_for_user_role
                    FOREIGN KEY(role_id)
                        REFERENCES role(id)
                        ON DELETE SET NULL
            );
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
                ADD COLUMN user_id uuid DEFAULT NULL,
                ADD FOREIGN KEY (user_id)
                    REFERENCES "user"(id)
                    ON DELETE SET NULL;
        `);
        await queryRunner.query(`
        INSERT INTO role (id, name)
        VALUES
            ('8ca56fe7-5b1b-4348-a43f-c3f916915b02', '${Role.ADMIN}'),
            ('9d41f29e-3022-4e44-b95d-ff083f388013', '${Role.USER}');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP TABLE "user";');
        await queryRunner.query('DROP TABLE role;');
        await queryRunner.query('DROP TABLE user_role;');
    }
}
