// ==============================================
// FILE: src/modules/todo/dto/update-todo.dto.ts
// ==============================================
import { PartialType } from '@nestjs/swagger';
import { IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateTodoDto } from './create-todo.dto';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @ApiProperty({
    description: 'Trạng thái hoàn thành',
    required: false,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
