import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { extname, join } from 'node:path';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('stream')
export class StreamController {
  @Get(':filename')
  @Public()
  stream(@Res() res: Response, @Param('filename') filename: string) {
    const filepath = join(__dirname, '..', '..', 'video', filename);

    // const mimeTypes = {
    //   '.m3u8': 'application/x-mpegURL',
    //   '.ts': 'video/mp2t',
    //   '.aac': 'audio/aac',
    //   '.m4s': 'video/iso.segment',
    //   '.mp4': 'video/mp4',
    // };

    const ext = extname(filepath);
    // console.log('Sending: ', mimeTypes[ext]);
    // res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
    // res.set('Cache-Control', 'no-store');
    // BUGFIX: L'erreur vient du callback qui est appelé après le renvoie de la réponse
    res.sendFile(filepath, (err) => {
      if (err) {
        res.status(404).send('File not found');
      }
    });
  }
}
