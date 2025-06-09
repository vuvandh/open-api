// ==============================================
// FILE: src/modules/todo/services/todos.service.ts
// ==============================================
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async create(createTodoDto: CreateTodoDto) {
    return this.prisma.todo.create({
      data: {
        ...createTodoDto,
        dueDate: createTodoDto.dueDate ? new Date(createTodoDto.dueDate) : null,
      },
      include: {
        category: true,
        priority: true,
      },
    });
  }

  async findAll() {
    return this.prisma.todo.findMany({
      include: {
        category: true,
        priority: true,
      },
      orderBy: [
        { priority: { level: 'desc' } }, // High priority first
        { createdAt: 'desc' },
      ],
    });
  }

  async findOne(id: string) {
    const todo = await this.prisma.todo.findUnique({
      where: { id },
      include: {
        category: true,
        priority: true,
      },
    });

    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    return todo;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    await this.findOne(id); // Check if exists

    return this.prisma.todo.update({
      where: { id },
      data: {
        ...updateTodoDto,
        dueDate: updateTodoDto.dueDate
          ? new Date(updateTodoDto.dueDate)
          : undefined,
      },
      include: {
        category: true,
        priority: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id); // Check if exists

    return this.prisma.todo.delete({
      where: { id },
      include: {
        category: true,
        priority: true,
      },
    });
  }

  async toggleComplete(id: string) {
    const todo = await this.findOne(id);
    return this.prisma.todo.update({
      where: { id },
      data: {
        completed: !todo.completed,
      },
      include: {
        category: true,
        priority: true,
      },
    });
  }

  // Statistics endpoints
  async getStats() {
    const [total, completed, pending, overdue] = await Promise.all([
      this.prisma.todo.count(),
      this.prisma.todo.count({ where: { completed: true } }),
      this.prisma.todo.count({ where: { completed: false } }),
      this.prisma.todo.count({
        where: {
          completed: false,
          dueDate: {
            lt: new Date(),
          },
        },
      }),
    ]);

    return {
      total,
      completed,
      pending,
      overdue,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }
}
