import { Injectable, NotFoundException } from '@nestjs/common';

import type { PageOptionsDto } from '../../common/dto/PageOptionsDto';
import type { UserLoginDto } from '..//auth/dto/UserLoginDto';
import type { UserRegistrationDto } from '../auth/dto/UserRegistrationDto';
import type { UserDto } from './dto/UserDto';
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

    async removeUser(userId: string): Promise<boolean> {
        if (!(await this.userRepository.removeUser(userId))) {
            throw new NotFoundException(
                `The user with id ${userId} not found.`,
            );
        }
        return true;
    }

    async getUserByEmail(email: string): Promise<UserDto | null> {
        const existingUser: UserEntity = await this.userRepository.getUserByEmail(
            email,
        );
        return existingUser ? existingUser.toDto() : null;
    }

    async gerUserForLogin(email: string): Promise<UserLoginDto> {
        const existingUser: UserLoginDto = await this.userRepository.gerUserForLogin(
            email,
        );
        return existingUser;
    }
}
