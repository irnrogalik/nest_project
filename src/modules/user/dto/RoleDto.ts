import { ApiProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import type { RoleEntity } from '../entity/role.entity';
import { Role } from '../role.enum';

export class RoleDto extends AbstractDto {
    @ApiProperty()
    name: Role;

    constructor(role: RoleEntity) {
        super(role);
        this.name = role.name;
    }
}
