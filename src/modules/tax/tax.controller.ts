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
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';

import { PageOptionsDto } from '../../common/dto/PageOptionsDto';
import { Roles } from '../../decorators/roles.decorator';
import { UUIDParam } from '../../decorators/uuid.decorators';
import { AdminJwtAuthGuard } from '../auth/admin/guard/admin.jwt-auth.guard';
import { Role } from '../user/role.enum';
import { RoleGuard } from '../user/role.guard';
import { TaxAddDto } from './dto/TaxAddDto';
import { TaxDto } from './dto/TaxDto';
import { TaxService } from './tax.service';

@Controller('tax')
@ApiTags('tax')
export class TaxController {
    constructor(private taxService: TaxService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Get full tax list',
        type: TaxDto,
    })
    @ApiBadRequestResponse({
        description: 'Error occurred during getting full tax list',
    })
    async getFullTaxes(
        @Query() pageOptions: PageOptionsDto,
    ): Promise<TaxDto[]> {
        const fullTaxList: TaxDto[] = await this.taxService.getFullTaxes(
            pageOptions,
        );
        return fullTaxList;
    }

    @Get('get')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Get tax list',
        type: TaxDto,
    })
    @ApiBadRequestResponse({
        description: 'Error occurred during getting tax list',
    })
    async getTaxes(): Promise<TaxDto[]> {
        const taxList: TaxDto[] = await this.taxService.getTaxes();
        return taxList;
    }

    @Post('add')
    @ApiBearerAuth()
    @UseGuards(AdminJwtAuthGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({
        description: 'Tax was successfully added',
        type: TaxDto,
    })
    @ApiBadRequestResponse({
        description: 'Error occurred during adding tax',
    })
    async addTax(@Body() taxAddDto: TaxAddDto): Promise<TaxDto> {
        const addResult: TaxDto = await this.taxService.addTax(taxAddDto);
        return addResult;
    }

    @Post('remove/:id')
    @ApiBearerAuth()
    @UseGuards(AdminJwtAuthGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiNoContentResponse({
        description: 'Tax was successfully removed',
    })
    @ApiNotFoundResponse({
        description: 'The tax was not found',
    })
    @ApiBadRequestResponse({
        description: 'Error occurred during removing tax',
    })
    async removeTax(@UUIDParam('id') taxId: string): Promise<boolean> {
        const result: boolean = await this.taxService.removeTax(taxId);
        return result;
    }
}
