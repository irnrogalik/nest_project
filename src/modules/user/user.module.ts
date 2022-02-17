import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleRepository } from './repository/role.repository';
import { UserRepository } from './repository/user.repository';
import { UserRoleRepository } from './repository/user.role.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository]),
        TypeOrmModule.forFeature([RoleRepository]),
        TypeOrmModule.forFeature([UserRoleRepository]),
    ],
    controllers: [UserController],
    exports: [UserService],
    providers: [UserService],
})
export class UserModule {}
