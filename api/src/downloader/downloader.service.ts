import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { default as axios } from 'axios';
import { TorznabParser } from './torznab.class';

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
    console.log(magnet);
    return 0;
  }

  async getMagnet(imdbID: string) {
    const apiKey = this.apiKey;

    try {
      const response = await axios.get(this.baseURL, {
        params: {
          apikey: apiKey,
          t: 'search',
          imdbid: `tt${imdbID}`,
        },
      });
      return new TorznabParser(response.data).getMagnet();
    } catch (e) {
      console.log(e);
    }

    return '';
  }
}
