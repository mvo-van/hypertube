import { Controller, Get, Logger, Param, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
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
import axios from 'axios';
import fs from "node:fs";

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

    console.log(filepath);
    while (!filepath) {
      filepath = await this.mediaFileService.getMediaFilePath(imdbID);
      sleep(500);
    }

    const isComplete = await this.mediaFileService.isDownloadFinished(imdbID);
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
          this.logger.error('FFmpeg error: ', err);
          if (!res.headersSent) {
            res.sendStatus(500);
          }
        })
        .stream(res);
    }
  }

  @Get(':imdb_id/subs')
  async subs(
    @Res() res: Response,
    @Param('imdb_id') imdb_id: string,
    @UserParam('userId') userId: number
  ) {
    const subtitles: any = [];
    const resSubTitleEn = await this.mediaFileService.findOneSubtitleFile(imdb_id, Lang.ENGLISH)
    if (!resSubTitleEn) {
      try {
        const enSubtitleURL = await this.downloadSubtitle(imdb_id, Lang.ENGLISH);
        if (enSubtitleURL) {
          subtitles.push({ lang: Lang.ENGLISH, src: enSubtitleURL });
        }
      } catch (e) {
        this.logger.log(e)
      }

    }
    else {
      subtitles.push({
        lang: Lang.ENGLISH,
        src: this.getSubtitleURL(imdb_id, Lang.ENGLISH)
      });
    }


    const user = await this.userService.findOne(userId);

    let langSubtitleURL;

    if (user?.language != Lang.ENGLISH) {
      const resSubTitleUserLang = await this.mediaFileService.findOneSubtitleFile(imdb_id, user?.language)
      if (!resSubTitleUserLang) {
        try {
          langSubtitleURL = await this.downloadSubtitle(imdb_id, user?.language as Lang);
          if (langSubtitleURL) {
            subtitles.push({ lang: user?.language, src: langSubtitleURL });
          }
        } catch (e) {
          this.logger.log(e)
        }

      } else {
        subtitles.push({
          lang: user?.language,
          src: this.getSubtitleURL(imdb_id, user?.language)
        });
      }

    }


    res.json({
      subtitles: subtitles
    });
  }

  private async downloadSubtitle(imdb_id: string, lang: Lang): Promise<string | null> {
    this.logger.log(`[${imdb_id}]: download subtitle for language '${lang}'`);
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

    if (!matchingSubtitles || matchingSubtitles.length == 0) {
      return null;
    }
    const firstMatch = matchingSubtitles[0];

    await sleep(5000);
    const subtitleURL = await api.download({
      file_id: firstMatch.attributes.files[0].file_id,
    });
    const subtitleResponse = await axios.get(subtitleURL.link);
    this.storeSubtitle(imdb_id, lang, subtitleResponse.data);

    return this.getSubtitleURL(imdb_id, lang);
  }

  private getSubtitleURL(imdb_id: string, lang: Lang): string | PromiseLike<string | null> | null {
    return `http://localhost:3000/stream/subtitle/${imdb_id}/${lang}`;
  }

  @Get("subtitle/:imdbID/:lang")
  @Public()
  async getSubtitle(@Res() res: Response, @Param("imdbID") imdbID: string, @Param("lang") lang: Lang) {
    const filepath = `/static/${imdbID}/${imdbID}.${lang}.vtt`;
    res.sendFile(filepath);
  }


  private async storeSubtitle(imdbID: string, lang: Lang, content: any) {
    const filepath = `/static/${imdbID}/${imdbID}.${lang}.vtt`;
    this.logger.log(`[${imdbID}]: store subtitle: ${filepath}`);
    try {
      // srt2vtt(content, (err, vttData) => {
      //   if (err) {
      //     throw new Error(err);
      //   }
      fs.writeFileSync(filepath, `WEBVTT \n\n ${content.replaceAll(",", ".")}`);
      // });
      this.mediaFileService.createSubtitleFile(imdbID, lang, filepath)
    } catch (err) {
      this.logger.error(`[${imdbID}]: error: ${err}`);
    }
  }
}

async function sleep(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
}
