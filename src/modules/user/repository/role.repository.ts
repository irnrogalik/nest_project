import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { RoleEntity } from '../entity/role.entity';
import type { Role } from '../role.enum';

@EntityRepository(RoleEntity)
export class RoleRepository extends Repository<RoleEntity> {
    async getRoleId(role: Role): Promise<string | null> {
        const roleId: RoleEntity = await this.query(
            'SELECT * FROM role WHERE name = $1',
            [role],
        );
        return roleId ? roleId[0].id : null;
    }
}
