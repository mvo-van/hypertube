import { Module } from '@nestjs/common';
import { MediaRetentionService } from './media-retention.service';
import { MediaFileModule } from 'src/media-file/media-file.module';

@Module({
  imports: [MediaFileModule],
  providers: [MediaRetentionService]
})
export class MediaRetentionModule {}
