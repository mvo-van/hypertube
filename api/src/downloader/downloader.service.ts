import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { default as axios } from 'axios';
import { TorznabParser } from './utils/torznab.class';
import torrentStream from 'torrent-stream';
import path from 'path';
import { Repository } from 'typeorm';
import { MovieStore } from './entities/movie-store.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DownloaderModule } from './downloader.module';

function isMovie(filename: string) {
  const VIDEO_EXTS = ['.mp4', '.m4v', '.mkv', '.webm', '.mov'];
  const currentExt = path.extname(filename);

  return VIDEO_EXTS.includes(currentExt);
}

@Injectable()
export class DownloaderService {
  private readonly logger = new Logger(DownloaderModule.name);

  apiKey: string;
  baseURL: string =
    'http://jackett:9117/api/v2.0/indexers/all/results/torznab/api';

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(MovieStore)
    private readonly movieStoreRepository: Repository<MovieStore>
  ) {
    this.apiKey = configService.get<string>('JACKETT_API_KEY')!;
  }

  // Search for a torrent and start downloading it
  async donwload(imdbID: string) {
    const magnet = await this.getMagnet(imdbID);
    const path = `/static/${imdbID}`;
    const engine = torrentStream(magnet, {
      connections: 3000,
      path: path,
    });

    engine.on('ready', () => {
      engine.files.forEach(async (file) => {
        if (isMovie(file.name)) {
          this.logger.log(`[${imdbID}]: downloading: ${path}/${file.path}`);
          const movieStore = this.movieStoreRepository.create({
            imdbID: imdbID,
            path: `${path}/${file.path}`
          });
          file.select();
          await this.movieStoreRepository.save(movieStore);
        } else {
          file.deselect();
        }
      });
    });

    engine.on('torrent', () => {
      this.logger.log(`[${imdbID}]: metadata fetched`);
    });

    engine.on('download', (pieceIndex) => {
      this.logger.log(`[${imdbID}]: piece ${pieceIndex} downloaded`);
    });

    engine.on('idle', async () => {
      await this.movieStoreRepository.update(imdbID, { completed: true });
      this.logger.log(`[${imdbID}]: download finished`);
      engine.destroy();
    });
  }

  async getMagnet(imdbID: string) {
    const apiKey = this.apiKey;

    try {
      const response = await axios.get(this.baseURL, {
        params: {
          apikey: apiKey,
          t: 'search',
          imdbid: imdbID,
        },
      });
      return new TorznabParser(response.data).getMagnet();
    } catch (e) {
      console.log(e);
    }
  }
}
