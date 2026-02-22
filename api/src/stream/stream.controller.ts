import { Controller, Get, Logger, Param, Query, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'node:path';
import { Public } from 'src/auth/decorators/public.decorator';
import { ConfigService } from '@nestjs/config';
import OS from 'opensubtitles.com';
import { DownloaderService } from 'src/downloader/downloader.service';
import { MediaFileService } from 'src/media-file/media-file.service';
import { StreamModule } from './stream.module';

@Controller('stream')
export class StreamController {
  private readonly logger = new Logger(StreamModule.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly downloadService: DownloaderService,
    private readonly mediaFileService: MediaFileService
  ) { }

  @Get('/imdb/:imdbID')
  @Public()
  async streamFromImdb(@Res() res: Response, @Param('imdbID') imdbID: string) {
    this.logger.log(`[${imdbID}]: initializing download`);
    await this.downloadService.donwloadFromImdbId(imdbID);
    // const filepath = join(__dirname, '..', '..', 'video', filename);

    this.logger.log(`[${imdbID}]: retrieving filepath`);
    let filepath = await this.mediaFileService.getMediaFilePath(imdbID);

    while (!filepath) {
      filepath = await this.mediaFileService.getMediaFilePath(imdbID);
      sleep(500);
    }

    res.sendFile(filepath, (err: Error) => {
      if (err) {
        res.status(404).end();
      }
    });
  }

  @Get(':filename')
  @Public()
  stream(@Res() res: Response, @Param('filename') filename: string) {
    const filepath = join(__dirname, '..', '..', 'video', filename);

    res.sendFile(filepath, (err: Error) => {
      if (err) {
        res.status(404).end();
      }
    });
  }

  @Get(':imdb_id/subs')
  @Public()
  async subs(
    @Res() res: Response,
    @Param('imdb_id') imdb_id: string,
  ) {
    // Sanitize filename
    const lang = 'fr'

    // let [basename, _] = filename.split('.');
    // basename = basename.replaceAll('-', ' ');
    // basename = basename.replaceAll('_', ' ');

    console.log(imdb_id);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const api = new OS({
      apikey: this.configService.get<string>('OPEN_SUBTITLE_API_KEY'),
      useragent: 'Hypertube v0.1',
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    api.login({
      username: this.configService.get<string>('OPEN_SUBTITLE_USERNAME'),
      password: this.configService.get<string>('OPEN_SUBTITLE_PASSWORD'),
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const response = await api.subtitles({ imdb_id: imdb_id });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const matchingSubtitles = response.data.filter((movie: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return movie.attributes.language == lang;
    });

    if (!matchingSubtitles) {
      res.status(404).json({ message: `no subtitles found language ${lang}` });
    }

    const firstMatch = matchingSubtitles[0];
    console.log(firstMatch);

    await sleep(5000);
    const subtitleURL = await api.download({
      file_id: firstMatch.attributes.files[0].file_id,
    });
    console.log(subtitleURL);

    res.json({ success: 'ok' });
  }
}

async function sleep(ms) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
}
