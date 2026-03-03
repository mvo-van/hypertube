import { Controller, Get, Param } from '@nestjs/common';
import { MediaFileService } from './media-file.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('media-file')
export class MediaFileController {
    constructor(private readonly mediaFileService: MediaFileService) {}

    @Get("/status/:imdbID")
    async status(@Param('imdbID') imdbID: string) {
        const mediaFile = await this.mediaFileService.getMediaFile(imdbID);

        if (!mediaFile) {
            return { exists: false };
        }
        return {
            exists: true,
            status: mediaFile.status!
        };
    }
}
