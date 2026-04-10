import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { default as axios } from 'axios';
import { TorznabParser } from './utils/torznab.class';
import torrentStream from 'torrent-stream';
import path from 'path';
import { DownloaderModule } from './downloader.module';
import { MediaFileService } from 'src/media-file/media-file.service';
import { MediaFileStatus } from 'src/media-file/enum/media-file-status.enum';

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
    private readonly mediaFileService: MediaFileService,
  ) {
    this.apiKey = configService.get<string>('JACKETT_API_KEY')!;
  }

  // Search for a torrent and start downloading it
  async donwload(imdbID: string) {
    const movieExists = await this.mediaFileService.movieFileExists(imdbID);

    if (movieExists) {
      this.logger.warn(`[${imdbID}]: media file already exists`);
      return;
    }
    const magnet = await this.getMagnet(imdbID);
    await this.startDownload(imdbID, magnet);
  }

  private async startDownload(imdbID: string, magnet: string | undefined) {
    const path = `/static/${imdbID}`;
    const engine = torrentStream(magnet, {
      connections: 500,
      path: path,
    });

    engine.on('ready', () => {
      this.logger.log(
        `[${imdbID}]: connected to ${engine.swarm.wires.length} peers`,
      );
      engine.files.forEach(async (file) => {
        if (isMovie(file.name)) {
          const filepath = `${path}/${file.path}`;

          this.logger.log(`[${imdbID}]: downloading: ${filepath}`);
          file.select();
          await this.mediaFileService.insertMediaFile({
            imdbID: imdbID,
            path: filepath,
            // Add language
          });
        } else {
          file.deselect();
        }
      });
    });

    engine.on('torrent', () => {
      this.logger.log(`[${imdbID}]: metadata fetched`);
      this.mediaFileService.setMediaFileStatus(imdbID, MediaFileStatus.STARTED);
    });

    engine.on('error', (err: Error) => {
      this.logger.error(`[${imdbID}]: download error: ${err}`);
      this.mediaFileService.setMediaFileStatus(imdbID, MediaFileStatus.ERROR);
    });

    engine.on('download', (pieceIndex: number) => {
      this.logger.log(`[${imdbID}]: piece ${pieceIndex} downloaded`);
      this.mediaFileService.setMediaFileStatus(
        imdbID,
        MediaFileStatus.DOWNLOADING,
      );
    });

    engine.on('idle', async () => {
      this.logger.log(`[${imdbID}]: download finished`);
      engine.destroy();
      await this.mediaFileService.transcodeToMP4(imdbID);
      await this.mediaFileService.setMediaFileStatus(
        imdbID,
        MediaFileStatus.FINISHED,
      );
    });
  }

  private async getMagnet(imdbID: string) {
    const apiKey = this.apiKey;

    try {
      const response = await axios.get(this.baseURL, {
        params: {
          apikey: apiKey,
          t: 'movie',
          imdbid: imdbID,
        },
      });
      return new TorznabParser(response.data).selectTorrent();
    } catch (e) {
      this.logger.error(e);
    }
  }

  async exists(imdbID: string): Promise<boolean> {
    const apiKey = this.apiKey;

    try {
      const response = await axios.get(this.baseURL, {
        params: {
          apikey: apiKey,
          t: 'movie',
          imdbid: imdbID,
        },
      });

      const items = new TorznabParser(response.data).getItems();
      return items.length != 0;
    } catch (e) {
      return false;
    }
  }
}
