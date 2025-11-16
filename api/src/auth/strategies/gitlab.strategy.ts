import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-gitlab2';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthStrategy } from '../auth.provider';
import { VerifyCallback } from 'passport-oauth2';

@Injectable()
export class GitlabStrategy extends PassportStrategy(Strategy, 'gitlab') {
  
  constructor(config: ConfigService) {
    super({
      clientID: config.get<string>('GITLAB_CLIENT_ID')!,
      clientSecret: config.get<string>('GITLAB_CLIENT_SECRET')!,
      callbackURL: 'http://localhost:3000/auth/gitlab/callback',
      scope: [],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    if (!profile) {
      console.error('GitLabStrategy.validate: profile is undefined');
      return done(new Error('No profile data from GitLab'), false);
    }
    console.log(JSON.stringify(profile, null, 2));

    const { _json } = profile;

    const email = _json?.email;
    const login = _json?.username;
    const firstName = _json?.name ?? login;
    const lastName = _json?.name ?? login;
    const photo = _json?.avatar_url;


    const user = {
      provider: AuthStrategy.GITLAB,
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
