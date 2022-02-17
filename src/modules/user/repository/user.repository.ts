import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import type { PageOptionsDto } from '../../../common/dto/PageOptionsDto';
import { getHash, paginate } from '../../../shared/functions';
import type { AdminRegistrationDto } from '../../auth/admin/dto/AdminRegistrationDto';
import type { UserRegistrationDto } from '../../auth/user/dto/UserRegistrationDto';
import { UserWithRoleDto } from '../dto/UserWithRoleDto';
import { UserEntity } from '../entity/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
    async getUserList(pageOptions: PageOptionsDto): Promise<UserEntity[]> {
        const users: UserEntity[] = await this.query(
            paginate('SELECT * FROM "user"', pageOptions),
        );
        return plainToInstance(UserEntity, users);
    }

    async addUser(
        newUser: UserRegistrationDto | AdminRegistrationDto,
    ): Promise<UserEntity> {
        const hash: string = await getHash(newUser.password);
        const address: string = 'address' in newUser ? newUser.address : null;
        const user: UserEntity = await this.query(
            'INSERT INTO "user" (name, email, password, phone, address) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [newUser.name, newUser.email, hash, newUser.phone, address],
        );
        return plainToInstance(UserEntity, user[0]);
    }

    async removeUser(userId: string): Promise<boolean> {
        const result: [
            [],
            boolean,
        ] = await this.query('DELETE FROM "user" WHERE id = $1', [userId]);
        return result[1];
    }

    async getUserByEmail(email: string): Promise<UserWithRoleDto | null> {
        const user: UserEntity = await this.query(
            `SELECT u.id, u.email, u.password, r.name as role
            FROM "user" u
            LEFT JOIN user_role ur on ur.user_id = u.id
            LEFT JOIN role r on r.id = ur.role_id
            WHERE email = $1`,
            [email],
        );
        return user ? plainToInstance(UserWithRoleDto, user[0]) : null;
    }
}
