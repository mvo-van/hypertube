import {
  IsEmail,
  IsString,
  IsStrongPassword,
  MaxLength,
  Matches,
} from 'class-validator';
import { MAX_LENGTH_PASSWORD, MIN_LENGTH_PASSWORD } from 'src/users/constants';

export class RestPasswordDto {
  @IsEmail()
  email: string;

  @IsString()
  @Matches('^\\d{6}$')
  otp_code?: string;

  @IsStrongPassword({
    minLength: MIN_LENGTH_PASSWORD,
    minSymbols: 1,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
  })
  @MaxLength(MAX_LENGTH_PASSWORD)
  newPassword: string;
}
