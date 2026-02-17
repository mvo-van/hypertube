import { Module } from '@nestjs/common';
import { WatchedService } from './watched.service';
import { WatchedController } from './watched.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Watched } from './entities/watched.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Watched]), WatchedModule, UsersModule],
  controllers: [WatchedController],
  providers: [WatchedService],
  exports: [WatchedService]
})
export class WatchedModule { }
