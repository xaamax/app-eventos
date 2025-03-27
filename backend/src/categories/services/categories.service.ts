import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCategoryDTO } from '../dtos/create-category.dto';
import { CategoryDetails } from '../interfaces/category';
import { buildPrismaSelect } from 'src/common/helpers/prismaSelect.helper';
import { CATEGORY_FIELDS } from '../constants';
import { UpdateCategoryDTO } from '../dtos/update-category.dto';
import { DeleteCategoryDTO } from '../dtos/delete-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async createCategory(data: CreateCategoryDTO): Promise<CategoryDetails> {
    const select = buildPrismaSelect<CategoryDetails>(CATEGORY_FIELDS);

    return await this.prisma.category.create({
      data,
      select,
    });
  }

  async getCategoryAll(): Promise<CategoryDetails[]> {
    return await this.prisma.category.findMany({
      select: buildPrismaSelect<CategoryDetails>(CATEGORY_FIELDS),
    });
  }

  async getCategoryById(id: number): Promise<CategoryDetails> {
    const user = await this.prisma.category.findUnique({
      where: { id },
      select: buildPrismaSelect<CategoryDetails>(CATEGORY_FIELDS),
    });
    if (!user) throw new NotFoundException('Categoria não encontrado.');

    return user;
  }

  async updateCategory(id: number, data: UpdateCategoryDTO) {
    const category = await this.prisma.category.findUnique({ where: { id } });

    if (!category) throw new NotFoundException('Categoria não encontrada.');

    return this.prisma.category.update({
      where: { id },
      data,
      select: buildPrismaSelect<CategoryDetails>(CATEGORY_FIELDS),
    });
  }

  async deleteCategory(id: number, data: DeleteCategoryDTO) {
    const user = await this.prisma.category.findUnique({ where: { id } });

    if (!user) throw new NotFoundException('Usuário não encontrado.');

    return this.prisma.category.update({
      where: { id },
      data,
      select: buildPrismaSelect<CategoryDetails>(CATEGORY_FIELDS),
    });
  }
}
