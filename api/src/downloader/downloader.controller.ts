import { Controller, Get, Param } from '@nestjs/common';
import { DownloaderService } from './downloader.service';
import { Public } from 'src/auth/decorators/public.decorator';

// TODO: TESTING ONLY, remove after flight
@Controller('download')
export class DownloaderController {
  constructor(private readonly downloaderService: DownloaderService) {}

  @Get(':imdb')
  @Public()
  async download(@Param('imdb') imdb: string) {
    // 1. Search a magnet on yts and popcorn
    // 2. Start the download with torrent-stream node package
    //  2.a. Start the download in a specific folder, named with the imdb ID
    // 3. Notify the streaming service that the download has started
    await this.downloaderService.donwload(imdb);
  }
}
