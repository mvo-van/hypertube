import { IsEmail, IsStrongPassword, MaxLength, IsString } from "class-validator";
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
        description: 'One-time password received via email',
        example: '123456',
    })
    @IsString()
    otp: string;
    
    @ApiProperty({
        description: 'New password for the account',
        minLength: MIN_LENGTH_PASSWORD,
        maxLength: MAX_LENGTH_PASSWORD,
        example: 'MyNewP@ssw0rd!',
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