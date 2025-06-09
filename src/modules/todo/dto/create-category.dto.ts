// ==============================================
// FILE: src/modules/todo/dto/create-category.dto.ts
// ==============================================
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Tên danh mục',
    example: 'Công việc',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Màu sắc (hex color)',
    example: '#3B82F6',
    required: false,
  })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiProperty({
    description: 'Icon hoặc emoji',
    example: '💼',
    required: false,
  })
  @IsOptional()
  @IsString()
  icon?: string;
}
