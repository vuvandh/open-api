// ==============================================
// FILE: src/modules/todo/services/labels.service.ts
// ==============================================
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';
import { CreateLabelDto } from '../dto/create-label.dto';
import { AssignLabelsDto } from '../dto/assign-labels.dto';

@Injectable()
export class LabelsService {
  constructor(private prisma: PrismaService) {}

  async create(createLabelDto: CreateLabelDto) {
    try {
      return await this.prisma.todoLabel.create({
        data: createLabelDto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          `Label with name "${createLabelDto.name}" already exists`,
        );
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.todoLabel.findMany({
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
    const label = await this.prisma.todoLabel.findUnique({
      where: { id },
      include: {
        todos: {
          include: {
            todo: {
              select: {
                id: true,
                title: true,
                completed: true,
                createdAt: true,
              },
            },
          },
        },
        _count: {
          select: { todos: true },
        },
      },
    });

    if (!label) {
      throw new NotFoundException(`Label with ID ${id} not found`);
    }

    return label;
  }

  async update(id: string, updateLabelDto: CreateLabelDto) {
    await this.findOne(id); // Check if exists

    try {
      return await this.prisma.todoLabel.update({
        where: { id },
        data: updateLabelDto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          `Label with name "${updateLabelDto.name}" already exists`,
        );
      }
      throw error;
    }
  }

  async remove(id: string) {
    await this.findOne(id); // Check if exists
    return this.prisma.todoLabel.delete({
      where: { id },
    });
  }

  async assignLabelsToTodo(todoId: string, assignLabelsDto: AssignLabelsDto) {
    // Check if todo exists
    const todo = await this.prisma.todo.findUnique({
      where: { id: todoId },
      select: { id: true },
    });

    if (!todo) {
      throw new NotFoundException(`Todo with ID ${todoId} not found`);
    }

    // Check if all labels exist
    const existingLabels = await this.prisma.todoLabel.findMany({
      where: { id: { in: assignLabelsDto.labelIds } },
      select: { id: true },
    });

    if (existingLabels.length !== assignLabelsDto.labelIds.length) {
      const foundIds = existingLabels.map((l) => l.id);
      const notFoundIds = assignLabelsDto.labelIds.filter(
        (id) => !foundIds.includes(id),
      );
      throw new NotFoundException(
        `Labels not found: ${notFoundIds.join(', ')}`,
      );
    }

    // Remove existing labels for this todo
    await this.prisma.todoLabelLink.deleteMany({
      where: { todoId },
    });

    // Add new labels
    await this.prisma.todoLabelLink.createMany({
      data: assignLabelsDto.labelIds.map((labelId) => ({
        todoId,
        labelId,
      })),
    });

    // Return updated todo with labels
    return this.prisma.todo.findUnique({
      where: { id: todoId },
      include: {
        category: true,
        priority: true,
        labels: {
          include: {
            label: true,
          },
        },
      },
    });
  }
}
