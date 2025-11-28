import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UtilsModule } from '../utils/utils.module';
import { MailerModule } from 'src/mailer/mailer.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UtilsModule,
    MailerModule,
    MulterModule.register({
      storage: diskStorage({
        destination: './static',
        filename: (req, image, cb) => {
          const uuid = crypto.randomUUID().slice(0, 8);
          const filename = `${Date.now()}-${uuid}.jpeg`;
          cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
