import { CategoriesService } from './../services/categories.service';
import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CreateCategoryDTO } from '../dtos/create-category.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UpdateCategoryDTO } from '../dtos/update-category.dto';
import { DeleteCategoryDTO } from '../dtos/delete-category.dto';

@ApiBearerAuth('Authorization')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post('/create')
  async create(
    @Body()
    createCategoryDTO: CreateCategoryDTO,
  ) {
    return await this.categoriesService.createCategory(createCategoryDTO);
  }

  @Get('/')
  async findAll() {
    return await this.categoriesService.getCategoryAll();
  }

  @Get('/:id/details')
  async findOne(@Param('id') id: number) {
    return await this.categoriesService.getCategoryById(+id);
  }

  @Put('/:id/update')
  async update(@Param('id') id: number, @Body() dto: UpdateCategoryDTO) {
    return await this.categoriesService.updateCategory(+id, dto);
  }

  @Patch('/:id/delete')
  async deleteUser(
    @Param('id') id: number,
    @Body() dto: DeleteCategoryDTO,
  ) {
    return await this.categoriesService.deleteCategory(+id, dto);
  }
}
