import { PartialType } from '@nestjs/swagger';
import { CreateWatchedDto } from './create-watched.dto';

export class UpdateWatchedDto extends PartialType(CreateWatchedDto) {}
