import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { TodoModule } from './modules/todo/todo.module';

@Module({
  imports: [
    CoreModule, // Config, Prisma, Health, Logger
    TodoModule, // Todo Management API
    // Future modules:
    // BlogModule,   // Blog API
    // MovieModule,  // Movie Database API
    // QuizModule,   // Quiz Platform API
    // AuthModule,   // Authentication API
  ],
})
export class AppModule {}
