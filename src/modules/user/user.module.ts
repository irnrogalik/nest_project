import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleModule } from '../role/role.module';
import { UserRoleModule } from '../user.role/user.role.module';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository]),
        RoleModule,
        UserRoleModule,
    ],
    controllers: [UserController],
    exports: [UserService],
    providers: [UserService],
})
export class UserModule {}
