import {
    BadRequestException,
    ConflictException,
    Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';

import type { UserLoginDto } from '../../../common/dto/UserLoginDto';
import type { AccessToken } from '../../../common/model';
import { Role } from '../../../common/model';
import { comparePasswordWithHash } from '../../../shared/functions';
import type { UserDto } from '../../user/dto/UserDto';
import { UserWithRoleDto } from '../../user/dto/UserWithRoleDto';
import { UserService } from '../../user/user.service';
import type { UserRegistrationDto } from './dto/UserRegistrationDto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(user: UserLoginDto): Promise<UserWithRoleDto> {
        const existingUser: UserWithRoleDto = await this.userService.getUserByEmail(
            user.email,
        );
        if (!existingUser) {
            throw new BadRequestException('Incorrect username or password');
        }
        const isTruePassword: boolean = await comparePasswordWithHash(
            user.password,
            existingUser.password,
        );
        const isUser: boolean = existingUser.role === Role.USER;
        if (!isTruePassword || !isUser) {
            throw new BadRequestException('Incorrect username or password');
        }
        return existingUser;
    }

    // eslint-disable-next-line camelcase
    login(user: UserWithRoleDto): AccessToken {
        const payload = { id: user.id, email: user.email, role: user.role };
        return {
            // eslint-disable-next-line camelcase
            access_token: this.jwtService.sign(payload),
        };
    }

    async registerUser(user: UserRegistrationDto): Promise<UserDto> {
        const getUser: UserWithRoleDto = await this.userService.getUserByEmail(
            user.email,
        );
        if (getUser) {
            throw new ConflictException('User with this email already exists');
        }
        const newUser: UserDto = await this.userService.addUser(user);
        await this.userService.addUserToRole(newUser.id, Role.USER);
        this.login(plainToInstance(UserWithRoleDto, newUser));
        return newUser;
    }
}
