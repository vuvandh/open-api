// ==============================================
// FILE: src/modules/todo/dto/query-todos.dto.ts
// ==============================================
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsBoolean,
  IsInt,
  Min,
  Max,
  IsDateString,
  IsUUID,
  IsIn,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class QueryTodosDto {
  @ApiPropertyOptional({
    description: 'Số trang (bắt đầu từ 1)',
    example: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({
    description: 'Số items per page',
    example: 10,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 10;

  @ApiPropertyOptional({
    description: 'Tìm kiếm theo tiêu đề hoặc mô tả',
    example: 'học prisma',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Lọc theo trạng thái',
    enum: ['completed', 'pending', 'all'],
    default: 'all',
  })
  @IsOptional()
  @IsIn(['completed', 'pending', 'all'])
  status: 'completed' | 'pending' | 'all' = 'all';

  @ApiPropertyOptional({
    description: 'Lọc theo category ID',
    example: 'uuid-string',
  })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiPropertyOptional({
    description: 'Lọc theo priority ID',
    example: 'uuid-string',
  })
  @IsOptional()
  @IsUUID()
  priorityId?: string;

  @ApiPropertyOptional({
    description: 'Lọc từ ngày (ISO string)',
    example: '2024-01-01T00:00:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  fromDate?: string;

  @ApiPropertyOptional({
    description: 'Lọc đến ngày (ISO string)',
    example: '2024-12-31T23:59:59.999Z',
  })
  @IsOptional()
  @IsDateString()
  toDate?: string;

  @ApiPropertyOptional({
    description: 'Sắp xếp theo',
    enum: ['createdAt', 'dueDate', 'priority', 'title'],
    default: 'createdAt',
  })
  @IsOptional()
  @IsIn(['createdAt', 'dueDate', 'priority', 'title'])
  sortBy: 'createdAt' | 'dueDate' | 'priority' | 'title' = 'createdAt';

  @ApiPropertyOptional({
    description: 'Thứ tự sắp xếp',
    enum: ['asc', 'desc'],
    default: 'desc',
  })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder: 'asc' | 'desc' = 'desc';
}
