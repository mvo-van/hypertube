import { Injectable } from '@nestjs/common';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHello(): string {
    const POSTGRES_USER = this.configService.get<string>("POSTGRES_USER");
    console.log(`User: ${POSTGRES_USER}`);
    return 'Hello World!';
  }
}
