import { Injectable, Logger } from '@nestjs/common';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { MediaFile } from './entities/media-file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Lang } from 'src/lang/lang';
import { SubtitleFile } from './entities/subtitle-file.entity';
import { MediaFileStatus } from './enum/media-file-status.enum';
import { CreateMediaFileDto } from './dto/create-media-file.dto';
import fs from "node:fs";

@Injectable()
export class MediaFileService {
    logger: Logger = new Logger(MediaFileService.name);

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

    async delete(imdbID: string) {
        const found = await this.mediaFileRepository.findOneBy({ imdbID: imdbID });

        if (!found) {
            this.logger.error(`[${imdbID}]: no DB entry`);
            return;
        }
        const folderpath = `/static/${imdbID}`;

        fs.rm(folderpath, { recursive: true, force: true }, (err) => {
            if (err) {
                this.logger.error(`[${imdbID}]: ${err}`);
            }
        });

        await this.mediaFileRepository.delete({ imdbID: imdbID });
    }

    async getOutdated(end: Date) : Promise<MediaFile[]> {
        const outdated = await this.mediaFileRepository.find({
            where: {
                lastWatchedAt: MoreThanOrEqual(end)
            }
        });

        if (!outdated) {
            return [];
        }
        return outdated;
    }
}
