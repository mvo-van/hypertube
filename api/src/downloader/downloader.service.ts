import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class DownloaderService {
  apiKey: string;
  baseURL: string =
    'http://jackett:9117/api/v2.0/indexers/all/results/torznab/api';

  constructor(private readonly configService: ConfigService) {
    this.apiKey = configService.get<string>('JACKETT_API_KEY')!;
  }

  async donwload(imdb: string) {
    const apiKey = this.apiKey;

    const response = await axios.get(this.baseURL, {
      params: {
        apikey: apiKey,
        t: 'search',
        imdbid: `tt${imdb}`,
      },
    });
    console.log(response.data);
    return 0;
  }
}
