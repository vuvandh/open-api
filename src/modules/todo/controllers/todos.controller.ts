// ==============================================
// FILE: src/modules/todo/controllers/todos.controller.ts
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
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { TodosService } from '../services/todos.service';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { QueryTodosDto } from '../dto/query-todos.dto';
import { BulkDeleteTodosDto } from '../dto/bulk-delete-todos.dto';
import { AssignPriorityDto } from '../dto/assign-priority.dto';

@ApiTags('📝 Todos')
@Controller('api/v1/todo/todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo todo mới' })
  @ApiResponse({ status: 201, description: 'Todo đã được tạo thành công' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách todos với paging và filtering' })
  @ApiResponse({ status: 200, description: 'Danh sách todos với pagination' })
  findAll(@Query() query: QueryTodosDto) {
    return this.todosService.findAll(query);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Lấy thống kê todos' })
  @ApiResponse({
    status: 200,
    description: 'Thống kê todos (total, completed, pending, overdue)',
  })
  getStats() {
    return this.todosService.getStats();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin todo theo ID' })
  @ApiResponse({ status: 200, description: 'Thông tin chi tiết todo' })
  @ApiResponse({ status: 404, description: 'Todo không tồn tại' })
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật todo' })
  @ApiResponse({ status: 200, description: 'Todo đã được cập nhật' })
  @ApiResponse({ status: 404, description: 'Todo không tồn tại' })
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(id, updateTodoDto);
  }

  @Patch(':id/toggle')
  @ApiOperation({ summary: 'Chuyển đổi trạng thái hoàn thành của todo' })
  @ApiResponse({ status: 200, description: 'Trạng thái đã được thay đổi' })
  @ApiResponse({ status: 404, description: 'Todo không tồn tại' })
  toggleComplete(@Param('id') id: string) {
    return this.todosService.toggleComplete(id);
  }

  @Patch(':id/priority')
  @ApiOperation({ summary: 'Gán priority cho todo' })
  @ApiResponse({ status: 200, description: 'Priority đã được gán' })
  @ApiResponse({ status: 404, description: 'Todo hoặc Priority không tồn tại' })
  assignPriority(
    @Param('id') id: string,
    @Body() assignPriorityDto: AssignPriorityDto,
  ) {
    return this.todosService.assignPriority(id, assignPriorityDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Xóa todo' })
  @ApiResponse({ status: 204, description: 'Todo đã được xóa' })
  @ApiResponse({ status: 404, description: 'Todo không tồn tại' })
  async remove(@Param('id') id: string) {
    await this.todosService.remove(id);
  }

  @Delete()
  @ApiOperation({ summary: 'Xóa nhiều todos theo IDs' })
  @ApiResponse({ status: 200, description: 'Các todos đã được xóa' })
  @ApiResponse({ status: 404, description: 'Một số todos không tồn tại' })
  bulkDelete(@Body() bulkDeleteDto: BulkDeleteTodosDto) {
    return this.todosService.bulkDelete(bulkDeleteDto);
  }
}
