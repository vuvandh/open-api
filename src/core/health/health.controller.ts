import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('🏥 health')
@Controller()
export class HealthController {
  @Get('health-check')
  @ApiOperation({ summary: 'Kiểm tra trạng thái server' })
  @ApiResponse({
    status: 200,
    description: 'Server đang hoạt động',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'ok' },
        timestamp: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
        uptime: { type: 'number', example: 123.456 },
        message: {
          type: 'string',
          example: 'Open API Server is running smoothly',
        },
        version: { type: 'string', example: '1.0.0' },
        apis: {
          type: 'array',
          example: ['todo', 'blog', 'movie', 'quiz'],
        },
      },
    },
  })
  healthCheck() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      message: 'Open API Server is running smoothly',
      version: '1.0.0',
      apis: {
        available: ['todo'],
        coming_soon: ['blog', 'movie', 'quiz', 'auth'],
      },
    };
  }
}
