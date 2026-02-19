import { forwardRef, Module } from '@nestjs/common';
import { DownloaderService } from './downloader.service';
import { DownloaderController } from './downloader.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieStore } from './entities/movie-store.entity';
import { SubtitlesModule } from 'src/subtitles/subtitles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovieStore]), 
    forwardRef(() => SubtitlesModule),
  ],
  providers: [DownloaderService],
  controllers: [DownloaderController],
  exports: [DownloaderService]
})
export class DownloaderModule {}
