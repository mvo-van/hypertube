import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MediaFile } from './entities/media-file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Lang } from 'src/lang/lang';
import { SubtitleFile } from './entities/subtitle-file.entity';
import { MediaFileStatus } from './enum/media-file-status.enum';
import { CreateMediaFileDto } from './dto/create-media-file.dto';

@Injectable()
export class MediaFileService {
    constructor(
        @InjectRepository(MediaFile)
        private readonly mediaFileRepository: Repository<MediaFile>,
        @InjectRepository(SubtitleFile)
        private readonly subtitleFileRepository: Repository<SubtitleFile>
    ) { }

    async insertMediaFile(createMediaFileDto: CreateMediaFileDto) {
        const mediaFile = this.mediaFileRepository.create({
            imdbID: createMediaFileDto.imdbID,
            path: createMediaFileDto.path,
            language: Lang.ENGLISH
        });

        await this.mediaFileRepository.save(mediaFile);
    }

    async setMediaFileStatus(imdbID: string, status: MediaFileStatus) {
        const mediaFile = await this.mediaFileRepository.findOneBy({ imdbID: imdbID });

        if (mediaFile) {
            mediaFile.status = status;
            await this.mediaFileRepository.update(imdbID, mediaFile);
        }
    }

    async setMovieDownloadFinished(imdbID: string) {
        await this.mediaFileRepository.update(imdbID, { status: MediaFileStatus.FINISHED });
    }

    async isDownloadFinished(imdbID: string): Promise<boolean> {
        const found = await this.mediaFileRepository.findOneBy({
            imdbID: imdbID
        });
        if (!found) {
            return false;
        }
        return found.status == MediaFileStatus.FINISHED;
    }

    async movieFileExists(imdbID: string): Promise<boolean> {
        const result = await this.mediaFileRepository.findOneBy({ imdbID: imdbID });
        return result !== null;
    }

    async getMediaFilePath(imdbID: string): Promise<string | null> {
        const result = await this.mediaFileRepository.findOne({
            where: { imdbID: imdbID }
        })
        return result ? result.path : null;
    }

    async getMediaFile(imdbID: string): Promise<MediaFile | null> {
        return await this.mediaFileRepository.findOneBy({ imdbID: imdbID });
    }

    async createSubtitleFile(imdbID: string, language: Lang, path: string) {
        const subtitleFile = this.subtitleFileRepository.create({ imdbID, path, language });
        await this.subtitleFileRepository.save(subtitleFile)
    }

    async findOneSubtitleFile(imdbID: string, language: Lang) {
        return this.subtitleFileRepository.findOneBy({ imdbID, language })
    }

    async watched(imdbID: string) {
        const mediaFile = await this.mediaFileRepository.findOneBy({ imdbID: imdbID });

        if (mediaFile) {
            mediaFile.lastWatchedAt = new Date();
            await this.mediaFileRepository.update(imdbID, mediaFile);
        }
    }
}
