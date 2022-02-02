import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AdminLocalStrategy } from '../auth/admin/strategy/local.strategy';
import { LocalStrategy } from '../auth/user/strategy/local.strategy';
import { UserModule } from '../user/user.module';
import { AdminAuthController } from './admin/auth.controller';
import { AdminAuthService } from './admin/auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './user/auth.controller';
import { AuthService } from './user/auth.service';

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
    ],
    exports: [AuthService, AdminAuthService],
})
export class AuthModule {}
