import { IsEmail } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
    @ApiProperty({
        description: 'Email address to send password reset instructions',
        example: 'john.doe@example.com',
    })
    @IsEmail()
    email: string;
}