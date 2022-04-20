import { ApiProperty } from '@nestjs/swagger';

import { Role } from '../role.enum';

export class UserWithRoleDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    role: Role;
}
