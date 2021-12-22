import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import type { PageOptionsDto } from '../../common/dto/PageOptionsDto';
import { paginate } from '../../shared/functions';
import { UserEntity } from './entity/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
    async getUserList(pageOptions: PageOptionsDto): Promise<UserEntity[]> {
        const users: UserEntity[] = await this.query(
            paginate('SELECT * FROM "user"', pageOptions),
        );
        return plainToInstance(UserEntity, users);
    }
}
