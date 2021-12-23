import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { PageOptionsDto } from '../../common/dto/PageOptionsDto';
import { UserDto } from './dto/UserDto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Get user list',
        type: UserDto,
    })
    @ApiBadRequestResponse({
        description: 'Error occurred during getting user list',
    })
    async getUserList(
        @Query() pageOptions: PageOptionsDto,
    ): Promise<UserDto[]> {
        const users: UserDto[] = await this.userService.getUserList(
            pageOptions,
        );
        return users;
    }
}
