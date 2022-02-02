import { Injectable, NotFoundException } from '@nestjs/common';

import type { PageOptionsDto } from '../../common/dto/PageOptionsDto';
import type { Role } from '../../common/model';
import type { AdminRegistrationDto } from '../auth/admin/dto/AdminRegistrationDto';
import type { UserRegistrationDto } from '../auth/user/dto/UserRegistrationDto';
import type { UserDto } from './dto/UserDto';
import type { UserWithRoleDto } from './dto/UserWithRoleDto';
import type { UserEntity } from './entity/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(public readonly userRepository: UserRepository) {}

    async getUserList(pageOptions: PageOptionsDto): Promise<UserDto[]> {
        const users: UserEntity[] = await this.userRepository.getUserList(
            pageOptions,
        );
        return users.toDtos();
    }

    async addUser(newUser: UserRegistrationDto): Promise<UserDto> {
        const user: UserEntity = await this.userRepository.addUser(newUser);
        return user.toDto();
    }

    async addAdmin(newAdmin: AdminRegistrationDto): Promise<UserDto> {
        const admin: UserEntity = await this.userRepository.addAdmin(newAdmin);
        return admin.toDto();
    }

    async addUserToRole(userId: string, role: Role): Promise<boolean> {
        const roleId: string = await this.userRepository.getRoleId(role);
        if (roleId) {
            const result: boolean = await this.userRepository.addUserToRole(
                userId,
                roleId,
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
