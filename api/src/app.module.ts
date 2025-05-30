import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBModule } from './db/db.module';
import { AppConfigModule } from './app-config/app-config.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [DBModule, AppConfigModule, HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
