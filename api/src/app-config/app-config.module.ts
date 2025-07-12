import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
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
      }),
    }),
  ],
})
export class AppConfigModule {}
