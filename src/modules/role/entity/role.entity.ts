import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity';
import { Role } from '../../../common/model';
import { RoleDto } from '../dto/RoleDto';

@Entity({ name: 'role' })
export class RoleEntity extends AbstractEntity<RoleDto> {
    @Column()
    name: Role;

    dtoClass = RoleDto;
}
