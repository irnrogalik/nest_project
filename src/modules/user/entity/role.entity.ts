import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity';
import { RoleDto } from '../dto/RoleDto';
import { Role } from '../role.enum';

@Entity({ name: 'role' })
export class RoleEntity extends AbstractEntity<RoleDto> {
    @Column()
    name: Role;

    dtoClass = RoleDto;
}
