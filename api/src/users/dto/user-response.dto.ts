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
    description: 'First name of the user',
    example: 'John',
  })
  @Expose()
  first_name: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
  })
  @Expose()
  last_name: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  @Expose()
  email: string;

  @ApiProperty({
    description: 'URL to the user profile picture',
    example: 'https://example.com/profile.jpg',
  })
  @Expose()
  profile_picture_url: string;

  @ApiProperty({
    description: 'Preferred language of the user',
    enum: Lang,
    example: Lang.ENGLISH,
  })
  @Expose()
  language: Lang;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
