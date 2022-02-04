import { ApiProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { Role } from '../../../common/model';
import type { RoleEntity } from '../entity/role.entity';

export class RoleDto extends AbstractDto {
    @ApiProperty()
    name: Role;

    constructor(role: RoleEntity) {
        super(role);
        this.name = role.name;
    }
}
