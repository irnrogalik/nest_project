import { Injectable } from '@nestjs/common';

import type { UserRoleDto } from './dto/UserRoleDto';
import { UserRoleRepository } from './user.role.repository';

@Injectable()
export class UserRoleService {
    constructor(public readonly userRoleRepository: UserRoleRepository) {}

    async addUserToRole(userRole: Partial<UserRoleDto>): Promise<boolean> {
        const result: boolean = await this.userRoleRepository.addUserToRole(
            userRole,
        );
        return result;
    }
}
