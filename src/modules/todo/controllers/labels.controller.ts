// ==============================================
// FILE: src/modules/todo/controllers/labels.controller.ts
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
import { LabelsService } from '../services/labels.service';
import { CreateLabelDto } from '../dto/create-label.dto';
import { AssignLabelsDto } from '../dto/assign-labels.dto';

@ApiTags('🔖 Labels')
@Controller('api/v1/todo/labels')
export class LabelsController {
  constructor(private readonly labelsService: LabelsService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo label mới' })
  @ApiResponse({ status: 201, description: 'Label đã được tạo' })
  @ApiResponse({ status: 409, description: 'Label đã tồn tại' })
  create(@Body() createLabelDto: CreateLabelDto) {
    return this.labelsService.create(createLabelDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả labels' })
  @ApiResponse({
    status: 200,
    description: 'Danh sách labels với số lượng todos',
  })
  findAll() {
    return this.labelsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin label theo ID' })
  @ApiResponse({
    status: 200,
    description: 'Thông tin label và todos liên quan',
  })
  @ApiResponse({ status: 404, description: 'Label không tồn tại' })
  findOne(@Param('id') id: string) {
    return this.labelsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật label' })
  @ApiResponse({ status: 200, description: 'Label đã được cập nhật' })
  @ApiResponse({ status: 404, description: 'Label không tồn tại' })
  @ApiResponse({ status: 409, description: 'Tên label đã tồn tại' })
  update(@Param('id') id: string, @Body() updateLabelDto: CreateLabelDto) {
    return this.labelsService.update(id, updateLabelDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Xóa label' })
  @ApiResponse({ status: 204, description: 'Label đã được xóa' })
  @ApiResponse({ status: 404, description: 'Label không tồn tại' })
  async remove(@Param('id') id: string) {
    await this.labelsService.remove(id);
  }
}

// Add separate controller for todo-label operations
@ApiTags('📝 Todos')
@Controller('api/v1/todo/todos')
export class TodoLabelsController {
  constructor(private readonly labelsService: LabelsService) {}

  @Patch(':id/labels')
  @ApiOperation({ summary: 'Gán nhiều labels cho todo' })
  @ApiResponse({ status: 200, description: 'Labels đã được gán' })
  @ApiResponse({ status: 404, description: 'Todo hoặc Labels không tồn tại' })
  assignLabels(
    @Param('id') id: string,
    @Body() assignLabelsDto: AssignLabelsDto,
  ) {
    return this.labelsService.assignLabelsToTodo(id, assignLabelsDto);
  }
}
