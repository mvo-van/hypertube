import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBModule } from './db/db.module';
import { AppConfigModule } from './app-config/app-config.module';
import { HealthModule } from './health/health.module';
import { UsersModule } from './users/users.module';
import { UtilsModule } from './utils/utils.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { MockDataService } from './mock-data/mock-data.service';
import { MockDataModule } from './mock-data/mock-data.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { MailerService } from './mailer/mailer.service'
import { MailerModule } from './mailer/mailer.module';
import { ImageModule } from './image/image.module';
import { DownloaderModule } from './downloader/downloader.module';
import { SubtitlesModule } from './subtitles/subtitles.module';
import { MovieStore } from './downloader/entities/movie-store.entity';
import { SubtitleStore } from './subtitles/entities/subtitles-store.entity';

@Module({
  imports: [
    DBModule,
    AppConfigModule,
    HealthModule,
    UsersModule,
    UtilsModule,
    AuthModule,
    MockDataModule,
    TypeOrmModule.forFeature([User, MovieStore, SubtitleStore]),
    MailerModule,
    ImageModule,
    DownloaderModule,
    SubtitlesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    MockDataService,
    MailerService,
  ],
})
export class AppModule {}
