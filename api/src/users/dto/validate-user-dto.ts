import { IsString, MaxLength, MinLength } from 'class-validator';
import { MAX_LENGTH_USERNAME, MIN_LENGTH_USERNAME } from '../constants';

export class ValidateUserDto {
  @IsString()
  @MaxLength(MAX_LENGTH_USERNAME)
  @MinLength(MIN_LENGTH_USERNAME)
  username: string;
}
