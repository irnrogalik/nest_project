import {
    BadRequestException,
    ConflictException,
    Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';

import type { UserLoginDto } from '../../../common/dto/UserLoginDto';
import { Role } from '../../../common/model';
import { comparePasswordWithHash } from '../../../shared/functions';
import type { UserDto } from '../../user/dto/UserDto';
import { UserWithRoleDto } from '../../user/dto/UserWithRoleDto';
import { UserService } from '../../user/user.service';
import type { AdminRegistrationDto } from './dto/AdminRegistrationDto';

@Injectable()
export class AdminAuthService {
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
        const isAdmin: boolean = existingUser.role === Role.ADMIN;
        if (!isTruePassword || !isAdmin) {
            throw new BadRequestException('Incorrect username or password');
        }
        return existingUser;
    }

    // eslint-disable-next-line camelcase
    login(user: UserWithRoleDto): { access_token: string } {
        const payload = { id: user.id, email: user.email, role: user.role };
        return {
            // eslint-disable-next-line camelcase
            access_token: this.jwtService.sign(payload),
        };
    }

    async registerAdmin(admin: AdminRegistrationDto): Promise<UserDto> {
        const getAdmin: UserWithRoleDto = await this.userService.getUserByEmail(
            admin.email,
        );
        if (getAdmin) {
            throw new ConflictException('User with this email already exists');
        }
        const newAdmin: UserDto = await this.userService.addAdmin(admin);
        if (newAdmin) {
            await this.userService.addUserToRole(newAdmin.id, Role.ADMIN);
        }
        this.login(plainToInstance(UserWithRoleDto, newAdmin));
        return newAdmin;
    }
}
