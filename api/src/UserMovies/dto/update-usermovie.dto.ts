import { PartialType } from '@nestjs/mapped-types';
import { CreateUserMovieDto } from './create-usermovie.dto';

export class UpdateUserMovieDto extends PartialType(CreateUserMovieDto) {}
