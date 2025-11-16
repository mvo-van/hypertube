import { Lang } from '../../lang/lang';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

@Exclude()
export class UserResponseDto {
  @ApiProperty({
    description: 'Username of the user',
    example: 'johndoe',
  })
  @Expose()
  username: string;

  @ApiProperty({
    description: "User's first name",
    example: 'John',
  })
  @Expose()
  first_name: string;

  @ApiProperty({
    description: "User's last name",
    example: 'Doe',
  })
  @Expose()
  last_name: string;

  @ApiProperty({
    description: "User's email address",
    example: 'john.doe@example.com',
  })
  @Expose()
  email: string;

  @ApiProperty({
    description: "URL to the user's profile picture",
    example: 'https://example.com/avatar.jpg',
  })
  @Expose()
  profile_picture_url: string;

  @ApiProperty({
    description: "User's preferred language",
    enum: Lang,
    example: Lang.ENGLISH,
  })
  @Expose()
  language: Lang;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
