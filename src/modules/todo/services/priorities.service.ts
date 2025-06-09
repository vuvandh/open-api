// ==============================================
// FILE: src/modules/todo/services/priorities.service.ts
// ==============================================
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';
import { CreatePriorityDto } from '../dto/create-priority.dto';

@Injectable()
export class PrioritiesService {
  constructor(private prisma: PrismaService) {}

  async create(createPriorityDto: CreatePriorityDto) {
    return this.prisma.todoPriority.create({
      data: createPriorityDto,
    });
  }

  async findAll() {
    return this.prisma.todoPriority.findMany({
      include: {
        _count: {
          select: { todos: true },
        },
      },
      orderBy: {
        level: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const priority = await this.prisma.todoPriority.findUnique({
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

    if (!priority) {
      throw new NotFoundException(`Priority with ID ${id} not found`);
    }

    return priority;
  }

  async update(id: string, updatePriorityDto: CreatePriorityDto) {
    await this.findOne(id); // Check if exists
    return this.prisma.todoPriority.update({
      where: { id },
      data: updatePriorityDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id); // Check if exists
    return this.prisma.todoPriority.delete({
      where: { id },
    });
  }
}
