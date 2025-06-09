// ==============================================
// FILE: src/modules/todo/dto/bulk-delete-todos.dto.ts
// ==============================================
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsUUID, ArrayMinSize } from 'class-validator';

export class BulkDeleteTodosDto {
  @ApiProperty({
    description: 'Danh sách ID các todo cần xóa',
    example: ['uuid-1', 'uuid-2', 'uuid-3'],
    type: [String],
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('4', { each: true })
  ids: string[];
}
