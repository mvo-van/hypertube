import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-42';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthStrategy } from '../auth.provider';
import { VerifyCallback } from 'passport-oauth2';

@Injectable()
export class FortytwoStrategy extends PassportStrategy(Strategy, 'fortytwo') {
  constructor(config: ConfigService) {
    super({
      clientID: config.get<string>('FORTYTWO_UID')!,
      clientSecret: config.get<string>('FORTYTWO_SECRET')!,
      callbackURL: "http://localhost:3000/auth/fortytwo/redirect",
      scope: ['public'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const { name, emails, _json } = profile;
    console.log(profile)
    const user = {
      provider: AuthStrategy.FORTYTWO,
      email: emails[0].value,
      first_name: name.givenName,
      last_name: name.familyName,
      picture: _json.image.link,
      accessToken,
      refreshToken,
    };
    done(null, user);
  }
}
