import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-spotify';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthStrategy } from '../auth.provider';
import { VerifyCallback } from 'passport-oauth2';

@Injectable()
export class SpotifyStrategy extends PassportStrategy(Strategy, 'spotify') {
  constructor(config: ConfigService) {
    super({
      clientID: config.get<string>('SPOTIFY_CLIENT_ID')!,
      clientSecret: config.get<string>('SPOTIFY_CLIENT_SECRET')!,
      callbackURL: 'http://127.0.0.1:3000/auth/spotify/callback',
      scope: ['user-read-email', 'user-read-private'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    if (!profile) {
      console.error('AzureStrategy.validate: profile is undefined');
      return done(new Error('No profile data from Azure'), false);
    }
    console.log(JSON.stringify(profile, null, 2));

    const { _json, emails } = profile;

    const email = emails?.[0]?.value ?? '';
    const login = _json?.display_name ?? '';
    const firstName = login;
    const lastName = login;
    const photo = _json?.images?.[0]?.value ?? null;

    const user = {
      provider: AuthStrategy.SPOTIFY,
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
