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
  async streamFromImdb(@Req() req: Request, @Res() res: Response, @Param('imdbID') imdbID: string) {
    this.logger.log(`[${imdbID}]: initializing download`);

    this.logger.log(`[${imdbID}]: retrieving filepath`);
    let filepath = await this.mediaFileService.getMediaFilePath(imdbID);

    while (!filepath) {
      filepath = await this.mediaFileService.getMediaFilePath(imdbID);
      sleep(500);
    }

    const isComplete = await this.mediaFileService.isDownloadComplete(imdbID);
    if (isComplete) {
      return this.streamCompletedFile(filepath, req, res);
    } else {
      return this.streamIncompleteFile(filepath, res);
    }
    // const fileStream = createReadStream(filepath);

    // ffmpeg(fileStream)
    //   .format('mp4')
    //   .videoCodec('libx264')
    //   .audioCodec('aac')
    //   .outputOptions([
    //     '-movflags frag_keyframe+empty_moov',
    //     '-preset veryfast',
    //   ])
    //   .on('start', cmd => console.log('FFmpeg command:', cmd))
    //   .on('error', (err) => {
    //     console.error('FFmpeg error:', err);
    //     if (!res.headersSent) res.sendStatus(500);
    //   })
    //   .pipe(res, { end: true });
  }


  // =========================
  // MODE 1 — FILE COMPLETE
  // =========================

  private async streamCompletedFile(
    filepath: string,
    req: Request,
    res: Response,
  ) {
    const stat = await fs.promises.stat(filepath);
    const fileSize = stat.size;
    const range = req.headers.range;

    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Accept-Ranges', 'bytes');

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1]
        ? parseInt(parts[1], 10)
        : fileSize - 1;

      const chunkSize = end - start + 1;

      res.status(206);
      res.setHeader(
        'Content-Range',
        `bytes ${start}-${end}/${fileSize}`,
      );
      res.setHeader('Content-Length', chunkSize);

      const stream = createReadStream(filepath, {
        start,
        end,
      });

      stream.pipe(res);
    } else {
      res.status(200);
      res.setHeader('Content-Length', fileSize);
      fs.createReadStream(filepath).pipe(res);
    }
  }

  // =========================
  // MODE 2 — FILE INCOMPLETE
  // =========================

  private streamIncompleteFile(
    filepath: string,
    res: Response,
  ) {
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
      res.status(404).json({ message: `no subtitles found language ${lang}` });
    }

    const firstMatch = matchingSubtitles[0];
    console.log(firstMatch);

    await sleep(5000);
    const subtitleURL = await api.download({
      file_id: firstMatch.attributes.files[0].file_id,
    });

    res.json({ success: 'ok' });
  }
}

async function sleep(ms) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
}
