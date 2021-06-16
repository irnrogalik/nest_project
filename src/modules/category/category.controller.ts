import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PageDto } from '../../common/dto/PageDto';
import { UUIDParam } from '../../decorators/uuid.decorators';
import { CategoryService } from './category.service';
import { CategoryAddDto } from './dto/CategoryAddDto';
import { CategoryDto } from './dto/CategoryDto';

@Controller('category')
@ApiTags('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get category list',
        type: PageDto,
    })
    getCategoryList(): Promise<PageDto<CategoryDto>> {
        return this.categoryService.getCategoryList();
    }

    @Post('add')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: CategoryDto,
        description: 'Category was successfully added',
    })
    async addCategory(
        @Body() categoryAddDto: CategoryAddDto,
    ): Promise<CategoryDto> {
        const category = await this.categoryService.addCategory(categoryAddDto);
        return category;
    }

    @Delete('remove/:id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: CategoryDto,
        description: 'Category was successfully removed',
    })
    removeCategory(@UUIDParam('id') categoryId: string): Promise<CategoryDto> {
        return this.categoryService.removeCategory(categoryId);
    }
}
