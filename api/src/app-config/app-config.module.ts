import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().hostname().required(),
        POSTGRES_PORT: Joi.number().port().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().min(8).required(),
        POSTGRES_DATABASE: Joi.string().required(),
        OMDB_API_KEY: Joi.string().required(),
        TMDB_API_KEY: Joi.string().required(),
        BCRYPT_SALT_ROUNDS: Joi.number().required(),
        JWT_SECRET: Joi.string().token().required(),
        GOOGLE_CLIENT_ID: Joi.string().required(),
        GOOGLE_CLIENT_SECRET: Joi.string().required(),
        FORTYTWO_UID:Joi.string().required(),
        FORTYTWO_SECRET:Joi.string().required(),
        GITHUB_CLIENT_ID: Joi.string().required(),
        GITHUB_CLIENT_SECRET: Joi.string().required(),
        GITLAB_CLIENT_ID: Joi.string().required(),
        GITLAB_CLIENT_SECRET: Joi.string().required(),
        DISCORD_CLIENT_ID: Joi.string().required(),
        DISCORD_CLIENT_SECRET: Joi.string().required(),
        SPOTIFY_CLIENT_ID: Joi.string().required(),
        SPOTIFY_CLIENT_SECRET: Joi.string().required(),
        MAIL: Joi.string().required(),
        MAIL_PASSWORD: Joi.string().required(),
      }),
    }),
  ],
})
export class AppConfigModule {}
