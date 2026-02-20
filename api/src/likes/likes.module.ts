import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { Like } from './entities/like.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Like]), LikesModule, UsersModule],
  controllers: [LikesController],
  providers: [LikesService],
  exports: [LikesService],

})
export class LikesModule { }
