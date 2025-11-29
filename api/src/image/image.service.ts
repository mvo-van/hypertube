import {
  BadRequestException,
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
    const staticFolder = join(__dirname, '..', '..', 'static');
    const filepath = join(staticFolder, filename);
    try {
      fs.writeFileSync(filepath, image.buffer);
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException('Cannot upload image');
    }
    return filename;
  }

  // async remove(filepath: string) {

  // }

  private check(image: Express.Multer.File) {
    if (image.size > 10 * MEGA_BYTE) {
      throw new PayloadTooLargeException('Image too large');
    }

    if (!ALLOWED_MIME_TYPES.includes(image.mimetype)) {
      throw new UnsupportedMediaTypeException('Bad file format');
    }
  }

  private makeFilename() {
    const uuid = crypto.randomUUID().slice(0, 8);
    const filename = `${Date.now()}-${uuid}.jpeg`;
    return filename;
  }
}
