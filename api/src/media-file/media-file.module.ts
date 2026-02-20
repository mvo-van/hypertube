import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaFile } from './entities/media-file.entity';
import { Subtitlefile } from './entities/subtitle-file.entity';
import { MediaFileService } from './media-file.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([MediaFile, Subtitlefile]),
    ],
    providers: [MediaFileService],
    exports: [MediaFileService]
})
export class MediaFileModule { }
