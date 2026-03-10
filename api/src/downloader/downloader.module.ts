import { forwardRef, Module } from '@nestjs/common';
import { DownloaderService } from './downloader.service';
import { DownloaderController } from './downloader.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaFile } from '../media-file/entities/media-file.entity';
import { SubtitlesModule } from 'src/subtitles/subtitles.module';
import { MediaFileModule } from 'src/media-file/media-file.module';

@Module({
  imports: [MediaFileModule],
  providers: [DownloaderService],
  controllers: [DownloaderController],
  exports: [DownloaderService]
})
export class DownloaderModule {}
