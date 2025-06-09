// ==============================================
// FILE: src/main.ts
// ==============================================
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend integration
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:8080',
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Open API Collection')
    .setDescription(
      `
    🚀 Open API Collection for Learning & Prototyping
    
    A comprehensive collection of production-ready APIs for developers to practice and build personal projects.
    
    Available APIs:
    - 📝 Todo Management: Complete task management with categories and priorities
    
    Coming Soon:
    - 📰 Blog API
    - 🎬 Movie Database API  
    - 🧠 Quiz Platform API
    - 🔐 Authentication API
    
    Features:
    - ✅ RESTful design
    - ✅ Realistic sample data
    - ✅ CORS enabled
    - ✅ Comprehensive documentation
    
    Base URL: \`/api/v1\`
  `,
    )
    .setVersion('1.0.0')
    .addTag('🏥 health', 'System Health Check')
    .addTag('📝 Todos', 'Todo CRUD Operations')
    .addTag('🗂️ Categories', 'Category Management')
    .addTag('🔺 Priorities', 'Priority Management')
    .addServer('http://localhost:3000', 'Development Server')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Open API Collection',
    customfavIcon: '📚',
    customCss: `
        .swagger-ui .topbar { display: none }
        .swagger-ui .info .title { color: #2563eb; }
      `,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`
    🚀 Open API Server is running!
    
    📍 Server: http://localhost:${port}
    📚 API Docs: http://localhost:${port}/api
    ❤️  Health Check: http://localhost:${port}/health-check
    
    Happy coding! 🎉
    `);
}
bootstrap();
