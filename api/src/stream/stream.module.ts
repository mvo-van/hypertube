import { Module } from '@nestjs/common';
import { StreamService } from './stream.service';
import { StreamController } from './stream.controller';
import { DownloaderModule } from 'src/downloader/downloader.module';
import { MediaFileModule } from 'src/media-file/media-file.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [DownloaderModule, MediaFileModule, UsersModule],
  providers: [StreamService],
  controllers: [StreamController]
})
export class StreamModule {}
