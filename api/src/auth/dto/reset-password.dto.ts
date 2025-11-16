import { IsEmail, IsString, IsStrongPassword, MaxLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { MAX_LENGTH_PASSWORD, MIN_LENGTH_PASSWORD } from "src/users/constants";

export class RestPasswordDto {
    @ApiProperty({
        description: 'Email address of the user',
        example: 'john.doe@example.com',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'One-time password code received via email',
        example: '123456',
    })
    @IsString()
    otp: string;

    @ApiProperty({
        description: 'New password for the user account',
        minLength: MIN_LENGTH_PASSWORD,
        maxLength: MAX_LENGTH_PASSWORD,
        example: 'NewStrongP@ss123',
    })
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