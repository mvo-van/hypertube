import {
  Injectable,
  InternalServerErrorException,
  Logger,
  PayloadTooLargeException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { ALLOWED_MIME_TYPES, MEGA_BYTE } from './image.const';
import { BASE_URL } from 'src/users/constants';
import { join } from 'path';
import fs from 'fs';

@Injectable()
export class ImageService {
  private readonly logger = new Logger(ImageService.name);

  store(image: Express.Multer.File): string {
    this.check(image);

    const filename = this.makeFilename();
    const filepath = this.makeFilepath(filename);
    try {
      fs.writeFileSync(filepath, image.buffer);
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException('Cannot upload image');
    }
    return this.makeUrl(filename);
  }

  removeFromUrl(url: string) {
    if (!this.isStaticFile(url)) {
      return;
    }
    const filename = this.extractFilenameFromUrl(url);

    try {
      const filepath = this.makeFilepath(filename);
      fs.unlinkSync(filepath);
    } catch (err) {
      this.logger.error(err);
    }
  }

  private check(image: Express.Multer.File) {
    if (image.size > 10 * MEGA_BYTE) {
      throw new PayloadTooLargeException('Image too large');
    }

    if (!ALLOWED_MIME_TYPES.includes(image.mimetype)) {
      throw new UnsupportedMediaTypeException('Bad file format');
    }
  }

  private makeUrl(filename: string) {
    return `${BASE_URL}/static/${filename}`;
  }

  private makeFilepath(filename: string): string {
    const staticFolder = join(__dirname, '..', '..', 'static');
    return join(staticFolder, filename);
  }

  private makeFilename(): string {
    const uuid = crypto.randomUUID().slice(0, 8);
    const filename = `${Date.now()}-${uuid}.jpeg`;
    return filename;
  }

  private extractFilenameFromUrl(url: string): string | null {
    const parsedUrl = new URL(url);
    const resources = parsedUrl.pathname.split('/').filter((elem) => elem);
    return resources.pop();
  }

  private isStaticFile(url: string): boolean {
    return new URL(url).origin.includes(BASE_URL);
  }
}
