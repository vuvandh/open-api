// ==============================================
// FILE: src/modules/todo/dto/create-priority.dto.ts
// ==============================================
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsInt,
  Min,
  Max,
  IsOptional,
} from 'class-validator';

export class CreatePriorityDto {
  @ApiProperty({
    description: 'Tên mức ưu tiên',
    example: 'High',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Cấp độ ưu tiên (1-5)',
    minimum: 1,
    maximum: 5,
    example: 3,
  })
  @IsInt()
  @Min(1)
  @Max(5)
  level: number;

  @ApiProperty({
    description: 'Màu sắc (hex color)',
    example: '#EF4444',
    required: false,
  })
  @IsOptional()
  @IsString()
  color?: string;
}
