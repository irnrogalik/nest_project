import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import type { PageOptionsDto } from '../../common/dto/PageOptionsDto';
import { getHash, paginate } from '../../shared/functions';
import { UserLoginDto } from '../auth/dto/UserLoginDto';
import type { UserRegistrationDto } from '../auth/dto/UserRegistrationDto';
import { UserEntity } from './entity/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
    async getUserList(pageOptions: PageOptionsDto): Promise<UserEntity[]> {
        const users: UserEntity[] = await this.query(
            paginate('SELECT * FROM "user"', pageOptions),
        );
        return plainToInstance(UserEntity, users);
    }

    async addUser(newUser: UserRegistrationDto): Promise<UserEntity> {
        const hash: string = await getHash(newUser.password);
        const user: UserEntity = await this.query(
            'INSERT INTO "user" (name, email, password, phone, address) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [newUser.name, newUser.email, hash, newUser.phone, newUser.address],
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

    async getUserByEmail(email: string): Promise<UserEntity> {
        const user: UserEntity = await this.query(
            'SELECT * FROM "user" WHERE email = $1',
            [email],
        );
        return plainToInstance(UserEntity, user[0]);
    }

    async gerUserForLogin(email: string): Promise<UserLoginDto> {
        const user: UserLoginDto = await this.query(
            'SELECT email, password FROM "user" WHERE email = $1',
            [email],
        );
        return plainToInstance(UserLoginDto, user[0]);
    }
}
