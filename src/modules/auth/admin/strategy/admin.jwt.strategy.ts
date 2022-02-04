import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, 'adminJwt') {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_ADMIN_SECRET_KEY'),
        });
    }

    validate(payload: {
        sub: string;
        username: string;
    }): { userId: string; username: string } {
        return { userId: payload.sub, username: payload.username };
    }
}
