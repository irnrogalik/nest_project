import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import type { UserWithRoleDto } from '../../../user/dto/UserWithRoleDto';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'email' });
    }

    async validate(
        username: string,
        password: string,
    ): Promise<UserWithRoleDto> {
        const validUser: UserWithRoleDto = await this.authService.validateUser({
            email: username,
            password,
        });
        if (!validUser) {
            throw new UnauthorizedException();
        }
        return validUser;
    }
}
