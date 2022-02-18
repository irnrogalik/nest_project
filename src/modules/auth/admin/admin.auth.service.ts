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
import type { AdminRegistrationDto } from './dto/AdminRegistrationDto';

@Injectable()
export class AdminAuthService {
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
        const isAdmin: boolean = existingUser.role === Role.ADMIN;
        if (!isTruePassword || !isAdmin) {
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
                secret: this.configService.get<string>('JWT_ADMIN_SECRET_KEY'),
            }),
        };
    }

    async registerAdmin(admin: AdminRegistrationDto): Promise<UserDto> {
        const isTrueSecretKey: boolean =
            admin.secretKey ===
            this.configService.get<string>('ADMIN_REGISTRATION_SECRET_KEY');
        if (!isTrueSecretKey) {
            throw new BadRequestException('Verification failed');
        }
        const getAdmin: UserWithRoleDto = await this.userService.getUserByEmail(
            admin.email,
        );
        if (getAdmin) {
            throw new ConflictException('User with this email already exists');
        }
        const newAdmin: UserDto = await this.userService.addUser(admin);
        await this.userService.addUserToRole(newAdmin.id, Role.ADMIN);
        this.login(plainToInstance(UserWithRoleDto, newAdmin));
        return newAdmin;
    }
}
