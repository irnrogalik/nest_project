import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Query,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';

import { PageOptionsDto } from '../../common/dto/PageOptionsDto';
import { UUIDParam } from '../../decorators/uuid.decorators';
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

    @Post('remove/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiNoContentResponse({
        description: 'User was successfully removed',
    })
    @ApiNotFoundResponse({
        description: 'The user was not found',
    })
    @ApiBadRequestResponse({
        description: 'Error occurred during removing user',
    })
    async removeUser(@UUIDParam('id') userId: string): Promise<boolean> {
        const result: boolean = await this.userService.removeUser(userId);
        return result;
    }
}
