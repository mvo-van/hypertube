import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMovie } from './entities/usermovie.entity';
import { UserMoviesService } from './usermovies.service';
import { UserMoviesController } from './usermovies.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserMovie])],
  controllers: [UserMoviesController],
  providers: [UserMoviesService],
  exports: [UserMoviesService],
})
export class UserMoviesModule {}
