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
import { FacebookStrategy } from './strategies/facebook.strategy';
import { DiscordStrategy } from './strategies/discord.strategy';
import { AuthController } from './auth.controller';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy, GoogleStrategy, FortytwoStrategy, GithubStrategy, GitlabStrategy, FacebookStrategy, DiscordStrategy],
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    UtilsModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
    }),
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
