import { Controller, Get, HttpCode, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('health')
export class HealthController {
  @Get()
  @HttpCode(200)
  health(@Res() res: Response) {
    res.json({ status: 'ok' });
  }
}
