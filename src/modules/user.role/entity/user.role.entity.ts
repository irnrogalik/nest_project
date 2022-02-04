import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity';
import { UserRoleDto } from '../dto/UserRoleDto';

@Entity({ name: 'user_role' })
export class UserRoleEntity extends AbstractEntity<UserRoleDto> {
    @Column({ name: 'user_id' })
    userId: string;

    @Column({ name: 'role_id' })
    roleId: string;

    dtoClass = UserRoleDto;
}
