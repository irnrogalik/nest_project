import { Injectable } from '@nestjs/common';

import type { PageOptionsDto } from '../../common/dto/PageOptionsDto';
import type { UserDto } from './dto/UserDto';
import type { UserEntity } from './entity/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(public readonly userRepository: UserRepository) {}

    async getUserList(pageOptions: PageOptionsDto): Promise<UserDto[]> {
        const users: UserEntity[] = await this.userRepository.getUserList(
            pageOptions,
        );
        return users.toDtos();
    }
}
