// ==============================================
// FILE: src/modules/todo/services/categories.service.ts
// ==============================================
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';
import { CreateCategoryDto } from '../dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.todoCategory.create({
      data: createCategoryDto,
    });
  }

  async findAll() {
    return this.prisma.todoCategory.findMany({
      include: {
        _count: {
          select: { todos: true },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const category = await this.prisma.todoCategory.findUnique({
      where: { id },
      include: {
        todos: {
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: { todos: true },
        },
      },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }

  async update(id: string, updateCategoryDto: CreateCategoryDto) {
    await this.findOne(id); // Check if exists
    return this.prisma.todoCategory.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id); // Check if exists
    return this.prisma.todoCategory.delete({
      where: { id },
    });
  }
}
