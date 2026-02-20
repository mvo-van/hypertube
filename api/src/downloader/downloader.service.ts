import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { default as axios } from 'axios';
import { TorznabParser } from './utils/torznab.class';
import torrentStream from 'torrent-stream';
import path from 'path';
import { DownloaderModule } from './downloader.module';
import { MediaFileService } from 'src/media-file/media-file.service';

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
    private readonly mediaFileService: MediaFileService
  ) {
    this.apiKey = configService.get<string>('JACKETT_API_KEY')!;
  }

  // Search for a torrent and start downloading it
  async donwload(imdbID: string) {
    if (await this.mediaFileService.movieFileExists(imdbID)) {
      this.logger.warn(`[${imdbID}]: media file already exists`);
    }
    const magnet = await this.getMagnet(imdbID);
    const path = `/static/${imdbID}`;
    const engine = torrentStream(magnet, {
      connections: 3000,
      path: path,
    });

    engine.on('ready', () => {
      engine.files.forEach(async (file) => {
        if (isMovie(file.name)) {
          const filepath = `${path}/${file.path}`;

          this.logger.log(`[${imdbID}]: downloading: ${filepath}`);
          file.select();
          await this.mediaFileService.insertMediaFile(imdbID, filepath);
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
      await this.mediaFileService.movieDownloadCompleted(imdbID);
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
