import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Query,
    Request,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';

import { PageOptionsDto } from '../../common/dto/PageOptionsDto';
import type { JwtUserPayload } from '../../common/model';
import { Roles } from '../../decorators/roles.decorator';
import { UUIDParam } from '../../decorators/uuid.decorators';
import { AdminJwtAuthGuard } from '../auth/admin/guard/admin.jwt-auth.guard';
import { JwtAuthGuard } from '../auth/user/guard/jwt-auth.guard';
import { UserDto } from './dto/UserDto';
import { UserWithRoleDto } from './dto/UserWithRoleDto';
import { Role } from './role.enum';
import { RoleGuard } from './role.guard';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('user')
@ApiBearerAuth()
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    @UseGuards(AdminJwtAuthGuard, RoleGuard)
    @Roles(Role.ADMIN)
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
    @UseGuards(AdminJwtAuthGuard, RoleGuard)
    @Roles(Role.ADMIN)
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

    @Get('profile')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(Role.USER)
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Get user profile',
        type: UserWithRoleDto,
    })
    @ApiNoContentResponse({
        description: 'Profile was successfully get',
    })
    @ApiNotFoundResponse({
        description: 'The user was not found',
    })
    @ApiBadRequestResponse({
        description: 'Error occurred during getting user profile',
    })
    async getProfile(
        @Request() req: { user: JwtUserPayload },
    ): Promise<UserWithRoleDto> {
        const email: string = req.user?.email;
        const result: UserWithRoleDto = await this.userService.getUserByEmail(
            email,
        );
        return result;
    }
}
