import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaFile } from './entities/media-file.entity';
import { SubtitleFile } from './entities/subtitle-file.entity';
import { MediaFileService } from './media-file.service';
import { MediaFileController } from './media-file.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([MediaFile, SubtitleFile]),
    ],
    providers: [MediaFileService],
    exports: [MediaFileService],
    controllers: [MediaFileController]
})
export class MediaFileModule { }
