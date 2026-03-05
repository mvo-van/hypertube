import { Controller, Get, Param, Post } from '@nestjs/common';
import { MediaFileService } from './media-file.service';

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

    // Set timestamp when it was last time watched
    @Post("/watched/:imdbID")
    async watched(@Param('imdbID') imdbID: string) {
        await this.mediaFileService.watched(imdbID);
    }
}
