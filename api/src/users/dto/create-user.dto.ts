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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'Username for the user',
    minLength: MIN_LENGTH_USERNAME,
    maxLength: MAX_LENGTH_USERNAME,
    example: 'johndoe',
  })
  @IsString()
  @MaxLength(MAX_LENGTH_USERNAME)
  @MinLength(MIN_LENGTH_USERNAME)
  username: string;

  @ApiProperty({
    description: 'First name of the user',
    minLength: MIN_LENGTH_FIRST_NAME,
    maxLength: MAX_LENGTH_FIRST_NAME,
    example: 'John',
  })
  @IsString()
  @MaxLength(MAX_LENGTH_FIRST_NAME)
  @MinLength(MIN_LENGTH_FIRST_NAME)
  first_name: string;

  @ApiProperty({
    description: 'Last name of the user',
    minLength: MIN_LENGTH_LAST_NAME,
    maxLength: MAX_LENGTH_LAST_NAME,
    example: 'Doe',
  })
  @IsString()
  @MaxLength(MAX_LENGTH_LAST_NAME)
  @MinLength(MIN_LENGTH_LAST_NAME)
  last_name: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    description: 'Password for the user (required for local authentication)',
    minLength: MIN_LENGTH_PASSWORD,
    maxLength: MAX_LENGTH_PASSWORD,
    example: 'MyP@ssw0rd!',
  })
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

  @ApiProperty({
    description: 'URL to the user profile picture',
    maxLength: MAX_LENGTH_PICTURE_URL,
    example: 'https://example.com/profile.jpg',
  })
  @IsString()
  @MaxLength(MAX_LENGTH_PICTURE_URL)
  profile_picture_url: string;

  @ApiPropertyOptional({
    description: 'Preferred language for the user',
    enum: Lang,
    example: Lang.ENGLISH,
  })
  @IsEnum(Lang)
  @IsOptional()
  language?: Lang;

  @ApiPropertyOptional({
    description: 'Authentication strategy used',
    enum: AuthStrategy,
  })
  @IsOptional()
  @IsEnum(AuthStrategy)
  auth_strategy?: AuthStrategy;

  @ApiPropertyOptional({
    description: 'One-time password code (6 digits)',
    pattern: '^\\d{6}$',
    example: '123456',
  })
  @IsOptional()
  @Matches("^\\d{6}$")
  otp_code?: string;
}
