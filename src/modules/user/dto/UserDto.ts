import { ApiProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import type { UserEntity } from '../entity/user.entity';

export class UserDto extends AbstractDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    address: string;

    constructor(user: UserEntity) {
        super(user);
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.phone = user.phone;
        this.address = user.address;
    }
}
