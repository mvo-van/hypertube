import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBModule } from './db/db.module';
import { AppConfigModule } from './app-config/app-config.module';

@Module({
  imports: [DBModule, AppConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
