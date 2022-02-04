import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import type { UserWithRoleDto } from '../../../user/dto/UserWithRoleDto';
import { AdminAuthService } from '../admin.auth.service';

@Injectable()
export class AdminLocalStrategy extends PassportStrategy(
    Strategy,
    'adminLocal',
) {
    constructor(private adminAuthService: AdminAuthService) {
        super({ usernameField: 'email' });
    }

    async validate(
        username: string,
        password: string,
    ): Promise<UserWithRoleDto> {
        const validUser: UserWithRoleDto = await this.adminAuthService.validateUser(
            {
                email: username,
                password,
            },
        );
        if (!validUser) {
            throw new UnauthorizedException();
        }
        return validUser;
    }
}
