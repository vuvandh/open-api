// ==============================================
// FILE: src/modules/todo/dto/assign-priority.dto.ts
// ==============================================
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class AssignPriorityDto {
  @ApiProperty({
    description: 'Priority ID',
    example: 'uuid-string',
  })
  @IsUUID()
  priorityId: string;
}
