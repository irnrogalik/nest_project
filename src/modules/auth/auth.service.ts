import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { comparePasswordWithHash } from '../../shared/functions';
import type { UserRegistrationDto } from '../auth/dto/UserRegistrationDto';
import type { UserDto } from '../user/dto/UserDto';
import { UserService } from '../user/user.service';
import type { UserLoginDto } from './dto/UserLoginDto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(user: UserLoginDto): Promise<UserLoginDto> {
        const existingUser: UserLoginDto = await this.userService.gerUserForLogin(
            user.email,
        );
        if (!existingUser) {
            throw new ConflictException(
                `User with the email ${user.email} do not exists`,
            );
        }
        const isTruePassword: boolean = await comparePasswordWithHash(
            user.password,
            existingUser.password,
        );
        if (!isTruePassword) {
            throw new ConflictException('It is the wrong password');
        }
        return existingUser;
    }

    login(user: any): any {
        const payload = { email: user.email };
        return {
            // eslint-disable-next-line camelcase
            access_token: this.jwtService.sign(payload),
        };
    }

    async addNewUser(user: UserRegistrationDto): Promise<UserDto> {
        const getUser: UserDto = await this.userService.getUserByEmail(
            user.email,
        );
        if (getUser) {
            throw new ConflictException('User with this email already exists');
        }
        const newUser: UserDto = await this.userService.addUser(user);
        this.login(newUser);
        return newUser;
    }
}
