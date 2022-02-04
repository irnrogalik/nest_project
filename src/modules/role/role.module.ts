import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleRepository } from './role.repository';
import { RoleService } from './role.service';

@Module({
    imports: [TypeOrmModule.forFeature([RoleRepository])],
    exports: [RoleService],
    providers: [RoleService],
})
export class RoleModule {}
