import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { JwtUser } from '../interfaces/jwt-user.interface';

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

  validate(payload: any): JwtUser {
    return {
      userId: payload.sub as number,
      username: payload.username as string,
    };
  }
}
