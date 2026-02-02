import { Controller, Get, Param, Query, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'node:path';
import { Public } from 'src/auth/decorators/public.decorator';
import ffmpeg from 'fluent-ffmpeg';
import { VideoMetadataExtractor } from '@opensubtitles/video-metadata-extractor';

@Controller('stream')
export class StreamController {
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

  @Get(':filename/subs')
  @Public()
  async subs(
    @Res() res: Response,
    @Query('lang') lang: string,
    @Param('filename') filename: string,
  ) {
    const filepath = join(__dirname, '..', '..', 'video', filename);

    const extractor = new VideoMetadataExtractor({
      debug: true,
      timeout: 60000,
      chunkSize: 50 * 1024 * 1024,
    });

    await extractor.initialize();

    // const subtitle = await extractor.extractSubtitle(filepath, )

    // const trackIndex = lang == 'fr' ? 0 : 1;

    // ffmpeg(filepath)
    //   .outputOptions([`-map 0:s:${trackIndex}`, `-f webvtt`])
    //   .on('start', () => console.log('Extract subtitles'))
    //   .on('error', (err: Error) => {
    //     console.log(err);
    //     res.status(500).send('Error extracting subtitles');
    //   })
    //   .pipe(res);
  }
}
