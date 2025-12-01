import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from './strategies/google.strategy';
import { FortytwoStrategy } from './strategies/fortytwo.strategy';
import { GithubStrategy } from './strategies/github.strategy';
import { GitlabStrategy } from './strategies/gitlab.strategy';
import { DiscordStrategy } from './strategies/discord.strategy';
import { SpotifyStrategy } from './strategies/spotify.strategy';
import { AuthController } from './auth.controller';
import { UtilsModule } from 'src/utils/utils.module';
import { MailerModule } from 'src/mailer/mailer.module';

@Module({
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
    FortytwoStrategy,
    GithubStrategy,
    GitlabStrategy,
    DiscordStrategy,
    SpotifyStrategy,
  ],
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    UtilsModule,
    MailerModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
    }),
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
