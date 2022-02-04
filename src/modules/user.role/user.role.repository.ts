import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import type { UserRoleDto } from './dto/UserRoleDto';
import { UserRoleEntity } from './entity/user.role.entity';

@EntityRepository(UserRoleEntity)
export class UserRoleRepository extends Repository<UserRoleEntity> {
    async addUserToRole(userRole: Partial<UserRoleDto>): Promise<boolean> {
        const result: UserRoleEntity[] = await this.query(
            'INSERT INTO user_role (user_id, role_id) VALUES ($1, $2) RETURNING *',
            [userRole.userId, userRole.roleId],
        );
        return result[0] ? true : false;
    }
}
