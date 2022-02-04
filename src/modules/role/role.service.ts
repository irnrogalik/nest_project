import { Injectable } from '@nestjs/common';

import type { Role } from '../../common/model';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
    constructor(public readonly roleRepository: RoleRepository) {}

    async getRoleId(role: Role): Promise<string | null> {
        const roleId: string = await this.roleRepository.getRoleId(role);
        return roleId;
    }
}
