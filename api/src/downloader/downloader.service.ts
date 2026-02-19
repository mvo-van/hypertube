import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { default as axios } from 'axios';
import { TorznabParser } from './utils/torznab.class';
import torrentStream from 'torrent-stream';
import path from 'path';

function isMovie(filename: string) {
  const VIDEO_EXTS = ['.mp4', '.m4v', '.mkv', '.webm', '.mov'];
  const currentExt = path.extname(filename);

  return VIDEO_EXTS.includes(currentExt);
}

@Injectable()
export class DownloaderService {
  apiKey: string;
  baseURL: string =
    'http://jackett:9117/api/v2.0/indexers/all/results/torznab/api';

  constructor(private readonly configService: ConfigService) {
    this.apiKey = configService.get<string>('JACKETT_API_KEY')!;
  }

  async donwload(imdbID: string) {
    const magnet = await this.getMagnet(imdbID);
    const path = `/static/${imdbID}`;
    const engine = torrentStream(magnet, {
      connections: 3000,
      path: path,
    });

    engine.on('ready', () => {
      engine.files.forEach((file) => {
        if (isMovie(file.name)) {
          console.log(`Selecting: ${file.name}`);
          console.log(`Downloading: ${path}/${file.path}`);
          file.select();
        } else {
          file.deselect();
        }
      });
    });

    engine.on('torrent', () => {
      console.log('Fetched metadata');
    });

    engine.on('download', (pieceIndex) => {
      console.log(`Downloaded: ${pieceIndex}`);
    });

    engine.on('idle', () => {
      console.log(`Download finished for ${imdbID}`);
      engine.destroy();
    });

    return 0;
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
