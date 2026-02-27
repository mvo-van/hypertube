import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaFile } from './entities/media-file.entity';
import { SubtitleFile } from './entities/subtitle-file.entity';
import { MediaFileService } from './media-file.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([MediaFile, SubtitleFile]),
    ],
    providers: [MediaFileService],
    exports: [MediaFileService]
})
export class MediaFileModule { }
