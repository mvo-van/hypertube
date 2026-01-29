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

    res.sendFile(filepath, (err) => {
      if (err) {
        res.status(404).end();
      }
    });
  }
}
