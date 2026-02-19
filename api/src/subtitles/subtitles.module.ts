import { forwardRef, Module } from '@nestjs/common';
import { SubtitleStore } from './entities/subtitles-store.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieStore } from 'src/downloader/entities/movie-store.entity';
import { DownloaderModule } from 'src/downloader/downloader.module';
import { SubtitlesService } from './subtitles.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([SubtitleStore]), 
        forwardRef(() => DownloaderModule),
    ],
    providers: [SubtitlesService],
    exports: [SubtitlesService]
})
export class SubtitlesModule {}
