import { Module } from '@nestjs/common';
import { DownloaderService } from './downloader.service';
import { DownloaderController } from './downloader.controller';

@Module({
  providers: [DownloaderService],
  controllers: [DownloaderController]
})
export class DownloaderModule {}
