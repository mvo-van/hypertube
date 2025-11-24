import { Module } from '@nestjs/common';
import { MockDataService } from './mock-data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UtilsModule } from 'src/utils/utils.module';
import { UsersService } from 'src/users/users.service';
import { UtilsService } from 'src/utils/utils.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UtilsModule, UtilsModule],
  providers: [MockDataService, UsersService, UtilsService],
  exports: [MockDataService],
})
export class MockDataModule {}
