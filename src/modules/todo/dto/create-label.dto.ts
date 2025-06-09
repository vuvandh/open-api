// ==============================================
// FILE: src/modules/todo/dto/create-label.dto.ts
// ==============================================
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateLabelDto {
  @ApiProperty({
    description: 'Tên label',
    example: 'Urgent',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Màu sắc (hex color)',
    example: '#EF4444',
    required: false,
  })
  @IsOptional()
  @IsString()
  color?: string;
}
