// ==============================================
// FILE: src/modules/todo/dto/assign-labels.dto.ts
// ==============================================
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsUUID } from 'class-validator';

export class AssignLabelsDto {
  @ApiProperty({
    description: 'Danh sách Label IDs',
    example: ['uuid-1', 'uuid-2'],
    type: [String],
  })
  @IsArray()
  @IsUUID('4', { each: true })
  labelIds: string[];
}
