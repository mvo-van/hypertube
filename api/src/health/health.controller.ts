import { Controller, Get, HttpCode, Res } from '@nestjs/common';
import { Response } from 'express';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('health')
export class HealthController {
  @Public()
  @Get()
  @HttpCode(200)
  health(@Res() res: Response) {
    res.json({ status: 'ok' });
  }
}
