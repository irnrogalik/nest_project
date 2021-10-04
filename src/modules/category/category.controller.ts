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
import { CategoryService } from './category.service';
import { CategoryAddDto } from './dto/CategoryAddDto';
import { CategoryDto } from './dto/CategoryDto';
import { CategoryListWithTaxesDto } from './dto/CategoryListWithTaxesDto';

@Controller('category')
@ApiTags('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Get category list with taxes',
        type: CategoryListWithTaxesDto,
    })
    @ApiBadRequestResponse({
        description: 'Error occurred during getting category list with taxes',
    })
    getCategoryListWithTaxes(): Promise<CategoryListWithTaxesDto[]> {
        return this.categoryService.getCategoryListWithTaxes();
    }

    @Get('get')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Get category list',
        type: CategoryDto,
    })
    @ApiBadRequestResponse({
        description: 'Error occurred during getting category list',
    })
    getCategoryList(): Promise<CategoryDto[]> {
        return this.categoryService.getCategoryList();
    }

    @Post('add')
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({
        description: 'Category was successfully added',
        type: CategoryDto,
    })
    @ApiBadRequestResponse({
        description: 'Error occurred during adding category',
    })
    async addCategory(
        @Body() categoryAddDto: CategoryAddDto,
    ): Promise<CategoryDto> {
        const category = await this.categoryService.addCategory(categoryAddDto);
        return category;
    }

    @Post('remove/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiNoContentResponse({
        description: 'Category was successfully removed',
    })
    @ApiNotFoundResponse({
        description: 'The category was not found',
    })
    @ApiBadRequestResponse({
        description: 'Error occurred during removing category',
    })
    removeCategory(@UUIDParam('id') categoryId: string): Promise<void> {
        return this.categoryService.removeCategory(categoryId);
    }
}
