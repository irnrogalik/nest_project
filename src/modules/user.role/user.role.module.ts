import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRoleRepository } from './user.role.repository';
import { UserRoleService } from './user.role.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserRoleRepository])],
    exports: [UserRoleService],
    providers: [UserRoleService],
})
export class UserRoleModule {}
