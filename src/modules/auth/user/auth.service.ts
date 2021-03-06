import {
    BadRequestException,
    ConflictException,
    Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';

import type { UserLoginDto } from '../../../common/dto/UserLoginDto';
import type { AccessToken, JwtUserPayload } from '../../../common/model';
import { comparePasswordWithHash } from '../../../shared/functions';
import type { UserDto } from '../../user/dto/UserDto';
import { UserWithRoleDto } from '../../user/dto/UserWithRoleDto';
import { Role } from '../../user/role.enum';
import { UserService } from '../../user/user.service';
import type { UserRegistrationDto } from './dto/UserRegistrationDto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService,
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
    login(user: JwtUserPayload): AccessToken {
        const payload: JwtUserPayload = {
            id: user.id,
            role: user.role,
        };
        return {
            // eslint-disable-next-line camelcase
            access_token: this.jwtService.sign(payload, {
                secret: this.configService.get<string>('JWT_USER_SECRET_KEY'),
            }),
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
