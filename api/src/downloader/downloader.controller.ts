import { Controller, Get } from '@nestjs/common';
import { DownloaderService } from './downloader.service';

// TODO: TESTING ONLY, remove after flight
@Controller('downloader')
export class DownloaderController {
  constructor(private readonly downloaderService: DownloaderService) {}

  @Get()
  download() {
    // 1. Search a magnet on yts and popcorn
    // 2. Start the download with torrent-stream node package
    //  2.a. Start the download in a specific folder, named with the imdb ID
    // 3. Notify the streaming service that the download has started
    this.downloaderService.donwload();
  }
}
