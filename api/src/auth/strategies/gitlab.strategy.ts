import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-gitlab2';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthStrategy } from '../auth.provider';
import { VerifyCallback } from 'passport-oauth2';
import { AuthModule } from '../auth.module';

@Injectable()
export class GitlabStrategy extends PassportStrategy(Strategy, 'gitlab') {
  private readonly logger = new Logger(AuthModule.name);

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
      this.logger.error('GitLabStrategy.validate: profile is undefined');
      return done(new Error('No profile data from GitLab'), false);
    }

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
