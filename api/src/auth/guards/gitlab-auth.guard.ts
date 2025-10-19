import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GitlabAuthGuard extends AuthGuard('gitlab') {
  constructor() {
    super({
      accessType: 'offline',
    });
  }
}
