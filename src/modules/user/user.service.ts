import { Injectable, NotFoundException } from '@nestjs/common';

import type { PageOptionsDto } from '../../common/dto/PageOptionsDto';
import type { Role } from '../../common/model';
import type { AdminRegistrationDto } from '../auth/admin/dto/AdminRegistrationDto';
import type { UserRegistrationDto } from '../auth/user/dto/UserRegistrationDto';
import { RoleService } from '../role/role.service';
import type { UserRoleDto } from '../user.role/dto/UserRoleDto';
import { UserRoleService } from '../user.role/user.role.service';
import type { UserDto } from './dto/UserDto';
import type { UserWithRoleDto } from './dto/UserWithRoleDto';
import type { UserEntity } from './entity/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        public readonly userRepository: UserRepository,
        private roleService: RoleService,
        private userRoleService: UserRoleService,
    ) {}

    async getUserList(pageOptions: PageOptionsDto): Promise<UserDto[]> {
        const users: UserEntity[] = await this.userRepository.getUserList(
            pageOptions,
        );
        return users.toDtos();
    }

    async addUser(
        newUser: UserRegistrationDto | AdminRegistrationDto,
    ): Promise<UserDto> {
        const user: UserEntity = await this.userRepository.addUser(newUser);
        return user.toDto();
    }

    async addUserToRole(userId: string, role: Role): Promise<boolean> {
        const roleId: string = await this.roleService.getRoleId(role);
        if (roleId) {
            const userToRole: Partial<UserRoleDto> = { userId, roleId };
            const result: boolean = await this.userRoleService.addUserToRole(
                userToRole,
            );
            return result;
        } else {
            return false;
        }
    }

    async removeUser(userId: string): Promise<boolean> {
        if (!(await this.userRepository.removeUser(userId))) {
            throw new NotFoundException(
                `The user with id ${userId} not found.`,
            );
        }
        return true;
    }

    async getUserByEmail(email: string): Promise<UserWithRoleDto | null> {
        const existingUser: UserWithRoleDto = await this.userRepository.getUserByEmail(
            email,
        );
        return existingUser || null;
    }
}
