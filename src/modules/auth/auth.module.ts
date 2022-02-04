import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { LocalStrategy } from '../auth/user/strategy/local.strategy';
import { UserModule } from '../user/user.module';
import { AdminAuthController } from './admin/admin.auth.controller';
import { AdminAuthService } from './admin/admin.auth.service';
import { AdminJwtStrategy } from './admin/strategy/admin.jwt.strategy';
import { AdminLocalStrategy } from './admin/strategy/admin.local.strategy';
import { AuthController } from './user/auth.controller';
import { AuthService } from './user/auth.service';
import { JwtStrategy } from './user/strategy/jwt.strategy';

@Module({
    imports: [
        UserModule,
        PassportModule,
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            // eslint-disable-next-line @typescript-eslint/require-await
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET_KEY'),
                signOptions: {
                    expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
                },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AuthController, AdminAuthController],
    providers: [
        AuthService,
        AdminAuthService,
        LocalStrategy,
        AdminLocalStrategy,
        JwtStrategy,
        AdminJwtStrategy,
    ],
    exports: [AuthService, AdminAuthService],
})
export class AuthModule {}
