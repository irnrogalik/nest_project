import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PageDto } from '../../common/dto/PageDto';
import { UUIDParam } from '../../decorators/uuid.decorators';
import { TaxAddDto } from './dto/TaxAddDto';
import { TaxDto } from './dto/TaxDto';
import type { TaxEntity } from './tax.entity';
import { TaxService } from './tax.service';

@Controller('tax')
@ApiTags('tax')
export class TaxController {
    constructor(private taxService: TaxService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get tax list',
        type: PageDto,
    })
    getFullTaxes(): Promise<TaxDto[]> {
        return this.taxService.getFullTaxes();
    }

    @Get('get')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get tax list',
        type: PageDto,
    })
    getTaxes(): Promise<TaxDto[]> {
        return this.taxService.getTaxes();
    }

    @Post('add')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: TaxDto,
        description: 'Tax was successfully added',
    })
    async addTax(@Body() taxAddDto: TaxAddDto): Promise<TaxDto> {
        const tax: TaxEntity = await this.taxService.addTax(taxAddDto);
        return tax;
    }

    @Post('remove/:id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: TaxDto,
        description: 'Tax was successfully removed',
    })
    removeTax(@UUIDParam('id') taxId: string): Promise<TaxDto> {
        return this.taxService.removeTax(taxId);
    }
}
