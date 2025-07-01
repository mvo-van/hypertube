import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBModule } from './db/db.module';
import { AppConfigModule } from './app-config/app-config.module';
import { HealthModule } from './health/health.module';
import { UsersModule } from './users/users.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [DBModule, AppConfigModule, HealthModule, UsersModule, UtilsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
