// ==============================================
// FILE: src/modules/todo/dto/create-todo.dto.ts
// ==============================================
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({
    description: 'Tiêu đề công việc',
    example: 'Hoàn thành dự án Open API',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Mô tả chi tiết',
    required: false,
    example: 'Tạo API collection cho các dự án học tập và prototype',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Hạn hoàn thành (ISO string)',
    required: false,
    example: '2024-12-31T23:59:59.000Z',
  })
  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @ApiProperty({
    description: 'ID danh mục',
    required: false,
    example: 'uuid-string-here',
  })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiProperty({
    description: 'ID mức ưu tiên',
    required: false,
    example: 'uuid-string-here',
  })
  @IsOptional()
  @IsString()
  priorityId?: string;
}
