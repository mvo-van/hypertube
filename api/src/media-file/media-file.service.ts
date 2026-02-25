import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MediaFile } from './entities/media-file.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MediaFileService {
    constructor(
        @InjectRepository(MediaFile)
        private readonly mediaFileRepository: Repository<MediaFile>
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
}
