/* eslint-disable camelcase */
import { ApiProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import type { UserRoleEntity } from '../entity/user.role.entity';

export class UserRoleDto extends AbstractDto {
    @ApiProperty()
    userId: string;

    @ApiProperty()
    roleId: string;
    constructor(userRole: UserRoleEntity) {
        super(userRole);
        this.userId = userRole.userId;
        this.roleId = userRole.roleId;
    }
}
