import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthStrategy } from '../auth.provider';
import { VerifyCallback } from 'passport-oauth2';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  
  constructor(config: ConfigService) {
    super({
      clientID: config.get<string>('FB_APP_ID')!,
      clientSecret: config.get<string>('FB_APP_SECRET')!,
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      scope: ['email']
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    if (!profile) {
      console.error('FacebookStrategy.validate: profile is undefined');
      return done(new Error('No profile data from Facebook'), false);
    }
    console.log(JSON.stringify(profile, null, 2));

    const { _json } = profile;

    const email = _json?.email;
    const login = _json?.username;
    const firstName = _json?.name ?? login;
    const lastName = _json?.name ?? login;
    const photo = _json?.avatar_url;


    const user = {
      provider: AuthStrategy.FACEBOOK,
      email: email,
      first_name: firstName,
      last_name: lastName,
      picture: photo,
      accessToken,
      refreshToken,
    };
    done(null, user);
  }
}
