import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity';
import { UserDto } from '../dto/UserDto';

@Entity({ name: 'user' })
export class UserEntity extends AbstractEntity<UserDto> {
    @Column()
    name?: string;

    @Column({ unique: true })
    email?: string;

    @Column()
    password?: string;

    @Column()
    phone?: string;

    @Column()
    address?: string;

    dtoClass = UserDto;
}
