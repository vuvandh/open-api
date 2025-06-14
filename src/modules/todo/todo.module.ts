// ==============================================
// FILE: src/modules/todo/todo.module.ts
// ==============================================
import { Module } from '@nestjs/common';
import { TodosController } from './controllers/todos.controller';
import { TodosService } from './services/todos.service';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { PrioritiesController } from './controllers/priorities.controller';
import { PrioritiesService } from './services/priorities.service';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import {
  LabelsController,
  TodoLabelsController,
} from './controllers/labels.controller';
import { LabelsService } from './services/labels.service';

@Module({
  imports: [PrismaModule], // Import PrismaModule để sử dụng PrismaService
  controllers: [
    TodosController,
    TodoLabelsController,
    CategoriesController,
    PrioritiesController,
    LabelsController,
  ],
  providers: [
    TodosService,
    CategoriesService,
    PrioritiesService,
    LabelsService,
  ],
})
export class TodoModule {}
