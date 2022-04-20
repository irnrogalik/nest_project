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
import type { JwtUserPayload } from '../../../common/model';
import { AccessToken } from '../../../common/model';
import { UserDto } from '../../user/dto/UserDto';
import { AuthService } from './auth.service';
import { UserRegistrationDto } from './dto/UserRegistrationDto';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({})
    @ApiBadRequestResponse({
        description: 'Incorrect username or password',
    })
    login(
        @Body() user: UserLoginDto,
        @Request() req: { user: JwtUserPayload },
    ): AccessToken {
        return this.authService.login(req.user);
    }

    @Post('registration')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: UserDto,
        description: 'User was successfully registered',
    })
    @ApiConflictResponse({
        description: 'User already exists',
    })
    @ApiBadRequestResponse({
        description: 'Error occurred during registering user',
    })
    async registration(
        @Body() userRegistrationDto: UserRegistrationDto,
    ): Promise<UserDto> {
        const newUser: UserDto = await this.authService.registerUser(
            userRegistrationDto,
        );
        return newUser;
    }
}
