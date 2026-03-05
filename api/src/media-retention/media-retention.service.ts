import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MediaFileService } from 'src/media-file/media-file.service';

const CRON_EVERY_MONTH: string = '0 0 1 * *';

@Injectable()
export class MediaRetentionService {
    logger: Logger = new Logger(MediaRetentionService.name);

    constructor(private readonly mediaFileService: MediaFileService) {}

    @Cron(CRON_EVERY_MONTH)
    async clean() {
        this.logger.log('cleaning outdated media file');
        await this.mediaFileService.cleanOudated(new Date());
    }
}
