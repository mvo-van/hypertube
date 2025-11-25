import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthStrategy } from '../auth.provider';
import { VerifyCallback } from 'passport-oauth2';
import { AuthModule } from '../auth.module';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  private readonly logger = new Logger(AuthModule.name);

  constructor(config: ConfigService) {
    super({
      clientID: config.get<string>('GITHUB_CLIENT_ID')!,
      clientSecret: config.get<string>('GITHUB_CLIENT_SECRET')!,
      callbackURL: 'http://localhost:3000/auth/github/callback',
      scope: ['user:email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    if (!profile) {
      this.logger.error('GitHubStrategy.validate: profile is undefined');
      return done(new Error('No profile data from GitHub'), false);
    }

    const { emails, _json } = profile;

    const email = emails?.[0].value;
    const login = _json?.login;
    const firstName = _json?.name?.givenName ?? login;
    const lastName = _json?.name?.familyName ?? login;
    const photo = null;

    const user = {
      provider: AuthStrategy.GITHUB,
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
