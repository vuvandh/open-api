// ==============================================
// FILE: src/modules/todo/services/todos.service.ts
// ==============================================
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { QueryTodosDto } from '../dto/query-todos.dto';
import { BulkDeleteTodosDto } from '../dto/bulk-delete-todos.dto';
import { AssignPriorityDto } from '../dto/assign-priority.dto';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  // Include object for consistent relations
  private readonly includeRelations = {
    category: true,
    priority: true,
    labels: {
      include: {
        label: true,
      },
    },
  };

  async create(createTodoDto: CreateTodoDto) {
    return this.prisma.todo.create({
      data: {
        ...createTodoDto,
        dueDate: createTodoDto.dueDate ? new Date(createTodoDto.dueDate) : null,
      },
      include: this.includeRelations,
    });
  }

  async findAll(query: QueryTodosDto) {
    const {
      page,
      limit,
      search,
      status,
      categoryId,
      priorityId,
      fromDate,
      toDate,
      sortBy,
      sortOrder,
    } = query;

    // Build where clause
    const where: any = {};

    // Search filter
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Status filter
    if (status !== 'all') {
      where.completed = status === 'completed';
    }

    // Category filter
    if (categoryId) {
      where.categoryId = categoryId;
    }

    // Priority filter
    if (priorityId) {
      where.priorityId = priorityId;
    }

    // Date range filter
    if (fromDate || toDate) {
      where.dueDate = {};
      if (fromDate) where.dueDate.gte = new Date(fromDate);
      if (toDate) where.dueDate.lte = new Date(toDate);
    }

    // Build orderBy - handle different sort types
    let orderBy: any = {};
    if (sortBy === 'priority') {
      orderBy = {
        priority: {
          level: sortOrder,
        },
      };
    } else {
      orderBy[sortBy] = sortOrder;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Execute queries
    const [todos, total] = await Promise.all([
      this.prisma.todo.findMany({
        where,
        include: this.includeRelations,
        orderBy,
        skip,
        take: limit,
      }),
      this.prisma.todo.count({ where }),
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return {
      data: todos,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext,
        hasPrev,
      },
    };
  }

  async findOne(id: string) {
    const todo = await this.prisma.todo.findUnique({
      where: { id },
      include: this.includeRelations,
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
      include: this.includeRelations,
    });
  }

  async remove(id: string) {
    await this.findOne(id); // Check if exists

    return this.prisma.todo.delete({
      where: { id },
      include: this.includeRelations,
    });
  }

  async bulkDelete(bulkDeleteDto: BulkDeleteTodosDto) {
    const { ids } = bulkDeleteDto;

    // Check if all todos exist
    const existingTodos = await this.prisma.todo.findMany({
      where: { id: { in: ids } },
      select: { id: true },
    });

    if (existingTodos.length !== ids.length) {
      const foundIds = existingTodos.map((t) => t.id);
      const notFoundIds = ids.filter((id) => !foundIds.includes(id));
      throw new NotFoundException(`Todos not found: ${notFoundIds.join(', ')}`);
    }

    // Delete todos
    const result = await this.prisma.todo.deleteMany({
      where: { id: { in: ids } },
    });

    return {
      message: `Successfully deleted ${result.count} todos`,
      deletedCount: result.count,
      deletedIds: ids,
    };
  }

  async toggleComplete(id: string) {
    const todo = await this.findOne(id);
    return this.prisma.todo.update({
      where: { id },
      data: {
        completed: !todo.completed,
      },
      include: this.includeRelations,
    });
  }

  async assignPriority(id: string, assignPriorityDto: AssignPriorityDto) {
    await this.findOne(id); // Check if todo exists

    // Check if priority exists
    const priority = await this.prisma.todoPriority.findUnique({
      where: { id: assignPriorityDto.priorityId },
    });

    if (!priority) {
      throw new NotFoundException(
        `Priority with ID ${assignPriorityDto.priorityId} not found`,
      );
    }

    return this.prisma.todo.update({
      where: { id },
      data: {
        priorityId: assignPriorityDto.priorityId,
      },
      include: this.includeRelations,
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
