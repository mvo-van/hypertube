import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-discord';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthStrategy } from '../auth.provider';
import { VerifyCallback } from 'passport-oauth2';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  
  constructor(config: ConfigService) {
    super({
      clientID: config.get<string>('DISCORD_CLIENT_ID')!,
      clientSecret: config.get<string>('DISCORD_CLIENT_SECRET')!,
      callbackURL: 'http://localhost:3000/auth/discord/callback',
      scope: ['identify', 'email']
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    if (!profile) {
      console.error('DiscordStrategy.validate: profile is undefined');
      return done(new Error('No profile data from Discord'), false);
    }
    console.log(JSON.stringify(profile, null, 2));

    const { global_name, email } = profile;

    const login = global_name;
    const firstName = global_name;
    const lastName = global_name;
    const photo = null;


    const user = {
      provider: AuthStrategy.DISCORD,
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
