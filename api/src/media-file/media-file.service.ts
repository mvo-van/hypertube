import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MediaFile } from './entities/media-file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Lang } from 'src/lang/lang';
import { SubtitleFile } from './entities/subtitle-file.entity';

@Injectable()
export class MediaFileService {
    constructor(
        @InjectRepository(MediaFile)
        private readonly mediaFileRepository: Repository<MediaFile>,
        @InjectRepository(SubtitleFile)
        private readonly subtitleFileRepository: Repository<SubtitleFile>
    ) {}

    async insertMediaFile(imdbID: string, path: string) {
        const mediaFile = this.mediaFileRepository.create({ imdbID, path });

        await this.mediaFileRepository.save(mediaFile);
    }

    async movieDownloadCompleted(imdbID: string) {
        await this.mediaFileRepository.update(imdbID, { completed: true });
    }

    async isDownloadComplete(imdbID: string) : boolean {
        const found = await this.mediaFileRepository.findOneBy({ 
            imdbID: imdbID
        });
        return found ? found.completed : false;
    }

    async movieFileExists(imdbID: string) : Promise<boolean> {
        const result = await this.mediaFileRepository.findOneBy({ imdbID: imdbID });
        return result !== null;
    }

    async getMediaFilePath(imdbID: string) : Promise<string | null> {
        const result = await this.mediaFileRepository.findOne({ 
            where: { imdbID: imdbID }
        })
        return result ? result.path : null;
    }

    async createSubtitleFile(imdbID:string, language:Lang, path:string){
        const subtitleFile = this.subtitleFileRepository.create({ imdbID, path, language });
        await this.subtitleFileRepository.save(subtitleFile)
    }

    async findOneSubtitleFile(imdbID:string, language:Lang){
        return this.subtitleFileRepository.findOneBy({imdbID, language})
    }
}
