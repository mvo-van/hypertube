import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

function extractJwtFromCookie(req: Request): string {
  const access_token: string = req.cookies.access_token as string;

  if (!access_token) {
    throw new BadRequestException('No JWT provided');
  }
  return access_token;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: extractJwtFromCookie,
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET')!,
    });
  }

  validate(payload: any) {
    return {
      userId: payload.sub,
      username: payload.username,
    };
  }
}
