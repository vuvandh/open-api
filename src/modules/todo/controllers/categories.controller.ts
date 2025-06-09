// ==============================================
// FILE: src/modules/todo/controllers/categories.controller.ts
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
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto } from '../dto/create-category.dto';

@ApiTags('🗂️ Categories')
@Controller('api/v1/todo/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo danh mục mới' })
  @ApiResponse({ status: 201, description: 'Danh mục đã được tạo' })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả danh mục' })
  @ApiResponse({
    status: 200,
    description: 'Danh sách danh mục với số lượng todos',
  })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin danh mục theo ID' })
  @ApiResponse({
    status: 200,
    description: 'Thông tin danh mục và todos liên quan',
  })
  @ApiResponse({ status: 404, description: 'Danh mục không tồn tại' })
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật danh mục' })
  @ApiResponse({ status: 200, description: 'Danh mục đã được cập nhật' })
  @ApiResponse({ status: 404, description: 'Danh mục không tồn tại' })
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: CreateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Xóa danh mục' })
  @ApiResponse({ status: 204, description: 'Danh mục đã được xóa' })
  @ApiResponse({ status: 404, description: 'Danh mục không tồn tại' })
  async remove(@Param('id') id: string) {
    await this.categoriesService.remove(id);
  }
}
