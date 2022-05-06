import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';

import { Roles } from '../../decorators/roles.decorator';
import { AdminJwtAuthGuard } from '../auth/admin/guard/admin.jwt-auth.guard';
import { Role } from '../user/role.enum';
import { RoleGuard } from '../user/role.guard';
import { PromocodeAddDto } from './dto/PromocodeAddDto';
import { PromoCodeBoolResponseDto } from './dto/PromoCodeBoolResponseDto';
import { PromocodeDto } from './dto/PromocodeDto';
import { PromocodeNameDto } from './dto/PromocodeNameDto';
import { PromocodeService } from './promo.service';

@Controller('promocode')
@ApiTags('promocode')
export class PromocodeController {
    constructor(private promocodeService: PromocodeService) {}

    @Get('getList')
    @ApiBearerAuth()
    @UseGuards(AdminJwtAuthGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @HttpCode(HttpStatus.CREATED)
    @ApiOkResponse({
        description: 'Get promocode list',
        type: [PromocodeDto],
    })
    @ApiBadRequestResponse({
        description: 'Error occurred during getting list of promocodes',
    })
    getListOfPromocodes(): Observable<string> {
        const newPromocode = this.promocodeService.getListOfPromocodes();
        return newPromocode;
    }

    @Post('add')
    @ApiBearerAuth()
    @UseGuards(AdminJwtAuthGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({
        description: 'New promocode was successfully added',
        type: PromocodeDto,
    })
    @ApiBadRequestResponse({
        description: 'Error occurred during adding promocode',
    })
    addPromoCode(@Body() promocodeAddDto: PromocodeAddDto): Observable<string> {
        const newPromocode = this.promocodeService.addPromoCode(
            promocodeAddDto,
        );
        return newPromocode;
    }

    @Post('remove')
    @ApiBearerAuth()
    @UseGuards(AdminJwtAuthGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Promocode was successfully removed',
        type: PromoCodeBoolResponseDto,
    })
    @ApiNotFoundResponse({
        description: 'The promocode was not found',
    })
    @ApiBadRequestResponse({
        description: 'Error occurred during removing promocode',
    })
    removePromoCode(
        @Body() promocodeName: PromocodeNameDto,
    ): Observable<string> {
        const result = this.promocodeService.removePromoCode(promocodeName);
        return result;
    }

    @Post('validate')
    @ApiBearerAuth()
    @UseGuards(AdminJwtAuthGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Validate promocode',
        type: PromoCodeBoolResponseDto,
    })
    @ApiBadRequestResponse({
        description: 'Error occurred during validations promocode',
    })
    isPromoCodeValid(
        @Body() promocodeName: PromocodeNameDto,
    ): Observable<string> {
        const result = this.promocodeService.isPromoCodeValid(promocodeName);
        return result;
    }

    @Post('markAsUsed')
    @ApiBearerAuth()
    @UseGuards(AdminJwtAuthGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Mark promocode as used',
        type: PromoCodeBoolResponseDto,
    })
    @ApiBadRequestResponse({
        description: 'Error occurred during marking promocode as used',
    })
    markPromoCodeAsUsed(
        @Body() promocodeName: PromocodeNameDto,
    ): Observable<string> {
        const result = this.promocodeService.markPromoCodeAsUsed(promocodeName);
        return result;
    }
}
