import { Injectable, NotFoundException } from '@nestjs/common';

import type { PageOptionsDto } from '../../common/dto/PageOptionsDto';
import type { AdminRegistrationDto } from '../auth/admin/dto/AdminRegistrationDto';
import type { UserRegistrationDto } from '../auth/user/dto/UserRegistrationDto';
import type { UserDto } from './dto/UserDto';
import type { UserRoleDto } from './dto/UserRoleDto';
import type { UserWithRoleDto } from './dto/UserWithRoleDto';
import type { UserEntity } from './entity/user.entity';
import { RoleRepository } from './repository/role.repository';
import { UserRepository } from './repository/user.repository';
import { UserRoleRepository } from './repository/user.role.repository';
import type { Role } from './role.enum';

@Injectable()
export class UserService {
    constructor(
        public readonly userRepository: UserRepository,
        private roleRepository: RoleRepository,
        private userRoleRepository: UserRoleRepository,
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
        const roleId: string = await this.roleRepository.getRoleId(role);
        if (roleId) {
            const userToRole: Partial<UserRoleDto> = { userId, roleId };
            const result: boolean = await this.userRoleRepository.addUserToRole(
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

    async getUserById(userId: string): Promise<UserWithRoleDto | null> {
        const existingUser: UserWithRoleDto = await this.userRepository.getUserById(
            userId,
        );
        return existingUser || null;
    }
}
