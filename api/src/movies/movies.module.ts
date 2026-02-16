import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { UtilsModule } from '../utils/utils.module';
import { UsersModule } from 'src/users/users.module';
import { LikesModule } from 'src/likes/likes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), UtilsModule, UsersModule, LikesModule],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService],
})
export class MoviesModule { }
