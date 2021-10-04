import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';

import { UUIDParam } from '../../decorators/uuid.decorators';
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
    getFullTaxes(): Promise<TaxDto[]> {
        return this.taxService.getFullTaxes();
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
    getTaxes(): Promise<TaxDto[]> {
        return this.taxService.getTaxes();
    }

    @Post('add')
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({
        description: 'Tax was successfully added',
        type: TaxDto,
    })
    @ApiBadRequestResponse({
        description: 'Error occurred during adding tax',
    })
    addTax(@Body() taxAddDto: TaxAddDto): Promise<TaxDto> {
        return this.taxService.addTax(taxAddDto);
    }

    @Post('remove/:id')
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
    removeTax(@UUIDParam('id') taxId: string): Promise<void> {
        return this.taxService.removeTax(taxId);
    }
}
