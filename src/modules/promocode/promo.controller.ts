import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Query,
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

import { PageOptionsDto } from '../../common/dto/PageOptionsDto';
import { Roles } from '../../decorators/roles.decorator';
import { AdminJwtAuthGuard } from '../auth/admin/guard/admin.jwt-auth.guard';
import { Role } from '../user/role.enum';
import { RoleGuard } from '../user/role.guard';
import { PromocodeAddDto } from './dto/PromocodeAddDto';
import { PromoCodeBoolResponseDto } from './dto/PromoCodeBoolResponseDto';
import { PromocodeDto } from './dto/PromocodeDto';
import { PromocodeNameDto } from './dto/PromocodeNameDto';
import { PromocodeRemoveDto } from './dto/PromocodeRemoveDto';
import type { IPromoCode, IPromoCodeBoolResponse } from './promo.interface';
import { PromocodeService } from './promo.service';

@Controller('promocode')
@ApiTags('promocode')
@ApiBearerAuth()
@UseGuards(AdminJwtAuthGuard, RoleGuard)
@Roles(Role.ADMIN)
export class PromocodeController {
    constructor(private promocodeService: PromocodeService) {}

    @Get('getList')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Get promocode list',
        type: [PromocodeDto],
    })
    @ApiBadRequestResponse({
        description: 'Error occurred during getting list of promocodes',
    })
    getListOfPromocodes(
        @Query() pageOptionsDto: PageOptionsDto,
    ): Observable<IPromoCode[]> {
        const promocodes = this.promocodeService.getListOfPromocodes(
            pageOptionsDto,
        );
        return promocodes;
    }

    @Post('add')
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({
        description: 'New promocode was successfully added',
        type: PromocodeDto,
    })
    @ApiBadRequestResponse({
        description: 'Error occurred during adding promocode',
    })
    async addPromoCode(
        @Body() promocodeAddDto: PromocodeAddDto,
    ): Promise<Observable<IPromoCode>> {
        const newPromocode = await this.promocodeService.addPromoCode(
            promocodeAddDto,
        );
        return newPromocode;
    }

    @Post('remove')
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
    async removePromoCode(
        @Body() promocode: PromocodeRemoveDto,
    ): Promise<Observable<IPromoCodeBoolResponse>> {
        const result = await this.promocodeService.removePromoCode(promocode);
        return result;
    }

    @Post('validate')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Validate promocode',
        type: PromoCodeBoolResponseDto,
    })
    @ApiBadRequestResponse({
        description: 'Error occurred during validations promocode',
    })
    async isPromoCodeValid(
        @Body() promocodeName: PromocodeNameDto,
    ): Promise<Observable<IPromoCodeBoolResponse>> {
        const result = this.promocodeService.isPromoCodeValid(promocodeName);
        return result;
    }

    @Post('markAsUsed')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Mark promocode as used',
        type: PromoCodeBoolResponseDto,
    })
    @ApiBadRequestResponse({
        description: 'Error occurred during marking promocode as used',
    })
    async markPromoCodeAsUsed(
        @Body() promocodeName: PromocodeNameDto,
    ): Promise<Observable<IPromoCodeBoolResponse>> {
        const result = this.promocodeService.markPromoCodeAsUsed(promocodeName);
        return result;
    }
}
