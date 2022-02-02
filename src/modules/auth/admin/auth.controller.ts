import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiConflictResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';

import { UserLoginDto } from '../../../common/dto/UserLoginDto';
import { AccessToken } from '../../../common/model';
import { UserDto } from '../../user/dto/UserDto';
import { AdminAuthService } from './auth.service';
import { AdminRegistrationDto } from './dto/AdminRegistrationDto';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth/admin')
@ApiTags('auth/admin')
export class AdminAuthController {
    constructor(private adminAuthService: AdminAuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({})
    @ApiBadRequestResponse({
        description: 'Incorrect username or password',
    })
    login(@Body() user: UserLoginDto, @Request() req): AccessToken {
        return this.adminAuthService.login(req.user);
    }

    @Post('registration')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: UserDto,
        description: 'Admin was successfully registered',
    })
    @ApiConflictResponse({
        description: 'Admin already exists',
    })
    @ApiBadRequestResponse({
        description: 'Error occurred during registering admin',
    })
    async registration(
        @Body() adminRegistrationDto: AdminRegistrationDto,
    ): Promise<UserDto> {
        const newUser: UserDto = await this.adminAuthService.registerAdmin(
            adminRegistrationDto,
        );
        return newUser;
    }
}
