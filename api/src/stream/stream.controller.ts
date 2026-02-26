import { Controller, Get, Logger, Param, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { join } from 'node:path';
import { Public } from 'src/auth/decorators/public.decorator';
import { ConfigService } from '@nestjs/config';
import OS from 'opensubtitles.com';
import { DownloaderService } from 'src/downloader/downloader.service';
import { MediaFileService } from 'src/media-file/media-file.service';
import { StreamModule } from './stream.module';
import { createReadStream } from 'node:fs';
import ffmpeg from "fluent-ffmpeg";
import { UsersService } from 'src/users/users.service';
import { UserParam } from 'src/auth/decorators/user-param.decorator';
import { Lang } from 'src/lang/lang';

@Controller('stream')
export class StreamController {
  private readonly logger = new Logger(StreamModule.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly downloadService: DownloaderService,
    private readonly mediaFileService: MediaFileService,
    private readonly userService: UsersService
  ) { }

  @Get('/imdb/:imdbID')
  @Public()
  async streamFromImdb(@Req() req: Request, @Res() res: Response, @Param('imdbID') imdbID: string) {
    this.logger.log(`[${imdbID}]: retrieving filepath`);
    let filepath = await this.mediaFileService.getMediaFilePath(imdbID);

    while (!filepath) {
      filepath = await this.mediaFileService.getMediaFilePath(imdbID);
      sleep(500);
    }

    const isComplete = await this.mediaFileService.isDownloadComplete(imdbID);
    if (isComplete) {
      res.sendFile(filepath);
    } else {
      res.setHeader('Content-Type', 'video/mp4');

      const fileStream = createReadStream(filepath);

      ffmpeg(fileStream)
        .format('mp4')
        .videoCodec('libx264')
        .audioCodec('aac')
        .outputOptions([
          '-movflags frag_keyframe+empty_moov',
          '-preset veryfast',
        ])
        .on('error', (err) => {
          console.error('FFmpeg error:', err);
          if (!res.headersSent) {
            res.sendStatus(500);
          }
        })
        .pipe(res, { end: true });
    }
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
    @UserParam('userId') userId: number
  ) {
    const subtitles: any = [];

    const enSubtitleURL = await this.downloadSubtitle(imdb_id, Lang.ENGLISH);
    if (enSubtitleURL) {
      subtitles.push({ 
        src: enSubtitleURL,
        lang: Lang.ENGLISH
      });
    }

    const user = await this.userService.findOne(userId);
    let langSubtitleURL;

    if (user?.language != Lang.ENGLISH) {
      langSubtitleURL = await this.downloadSubtitle(imdb_id, user?.language as Lang);
      if (langSubtitleURL) {
        subtitles.push({
          src: langSubtitleURL,
          lang: user?.language
        });
      }
    }
    // res.json({ 
    //   subtitles: subtitles
    // });
    res.json({});
  }

  private async downloadSubtitle(imdb_id: string, lang: string) : Promise<string | null> {
    console.log(imdb_id);
    const api = new OS({
      apikey: this.configService.get<string>('OPEN_SUBTITLE_API_KEY'),
      useragent: 'Hypertube v0.1',
    });

    api.login({
      username: this.configService.get<string>('OPEN_SUBTITLE_USERNAME'),
      password: this.configService.get<string>('OPEN_SUBTITLE_PASSWORD'),
    });

    const response = await api.subtitles({ imdb_id: imdb_id });

    const matchingSubtitles = response.data.filter((movie: any) => {
      return movie.attributes.language == lang;
    });

    if (!matchingSubtitles) {
      return null;
    }

    const firstMatch = matchingSubtitles[0];
    console.log(firstMatch);

    await sleep(5000);
    const subtitleURL = await api.download({
      file_id: firstMatch.attributes.files[0].file_id,
    });
    return subtitleURL;
  }
}

async function sleep(ms) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
}
