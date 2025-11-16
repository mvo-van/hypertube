import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
    @ApiProperty({
        description: 'Email address of the user requesting password reset',
        example: 'john.doe@example.com',
    })
    @IsEmail()
    email: string;
}