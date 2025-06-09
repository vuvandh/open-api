// ==============================================
// FILE: src/core/core.module.ts
// ==============================================
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { HealthController } from './health/health.controller';

@Module({
  imports: [PrismaModule],
  controllers: [HealthController],
  exports: [PrismaModule],
})
export class CoreModule {}
