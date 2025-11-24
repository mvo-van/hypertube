import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  MAX_LENGTH_FIRST_NAME,
  MAX_LENGTH_LAST_NAME,
  MAX_LENGTH_PASSWORD,
  MAX_LENGTH_PICTURE_URL,
  MAX_LENGTH_USERNAME,
  MIN_LENGTH_FIRST_NAME,
  MIN_LENGTH_LAST_NAME,
  MIN_LENGTH_PASSWORD,
  MIN_LENGTH_USERNAME,
} from '../constants';
import { Lang } from '../../lang/lang';
import { AuthStrategy } from 'src/auth/auth.provider';

export class CreateUserDto {
  @IsString()
  @MaxLength(MAX_LENGTH_USERNAME)
  @MinLength(MIN_LENGTH_USERNAME)
  username: string;

  @IsString()
  @MaxLength(MAX_LENGTH_FIRST_NAME)
  @MinLength(MIN_LENGTH_FIRST_NAME)
  first_name: string;

  @IsString()
  @MaxLength(MAX_LENGTH_LAST_NAME)
  @MinLength(MIN_LENGTH_LAST_NAME)
  last_name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: MIN_LENGTH_PASSWORD,
    minSymbols: 1,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
  })
  @MaxLength(MAX_LENGTH_PASSWORD)
  @IsOptional()
  password?: string;

  @IsEnum(Lang)
  @IsOptional()
  language?: Lang;
  @IsString()
  @MaxLength(MAX_LENGTH_PICTURE_URL)
  @IsOptional()
  profile_picture_url?: string =
    'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';

  @IsOptional()
  @IsEnum(AuthStrategy)
  auth_strategy?: AuthStrategy;

  // TODO: TO DELETE
  @IsOptional()
  @Matches('^\\d{6}$')
  otp_code?: string;
}
