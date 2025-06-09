// ==============================================
// FILE: src/modules/todo/controllers/priorities.controller.ts
// ==============================================
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PrioritiesService } from '../services/priorities.service';
import { CreatePriorityDto } from '../dto/create-priority.dto';

@ApiTags('🔺 Priorities')
@Controller('api/v1/todo/priorities')
export class PrioritiesController {
  constructor(private readonly prioritiesService: PrioritiesService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo mức ưu tiên mới' })
  @ApiResponse({ status: 201, description: 'Mức ưu tiên đã được tạo' })
  create(@Body() createPriorityDto: CreatePriorityDto) {
    return this.prioritiesService.create(createPriorityDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả mức ưu tiên' })
  @ApiResponse({
    status: 200,
    description: 'Danh sách mức ưu tiên với số lượng todos',
  })
  findAll() {
    return this.prioritiesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin mức ưu tiên theo ID' })
  @ApiResponse({
    status: 200,
    description: 'Thông tin mức ưu tiên và todos liên quan',
  })
  @ApiResponse({ status: 404, description: 'Mức ưu tiên không tồn tại' })
  findOne(@Param('id') id: string) {
    return this.prioritiesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật mức ưu tiên' })
  @ApiResponse({ status: 200, description: 'Mức ưu tiên đã được cập nhật' })
  @ApiResponse({ status: 404, description: 'Mức ưu tiên không tồn tại' })
  update(
    @Param('id') id: string,
    @Body() updatePriorityDto: CreatePriorityDto,
  ) {
    return this.prioritiesService.update(id, updatePriorityDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Xóa mức ưu tiên' })
  @ApiResponse({ status: 204, description: 'Mức ưu tiên đã được xóa' })
  @ApiResponse({ status: 404, description: 'Mức ưu tiên không tồn tại' })
  async remove(@Param('id') id: string) {
    await this.prioritiesService.remove(id);
  }
}
