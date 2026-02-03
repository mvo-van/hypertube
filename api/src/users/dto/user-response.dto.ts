import { Lang } from '../../lang/lang';
import { Exclude, Expose } from 'class-transformer';
import { User } from '../entities/user.entity';

@Exclude()
export class UserResponseDto {
  @Expose()
  username: string;

  @Expose()
  first_name: string;

  @Expose()
  last_name: string;

  @Expose()
  profile_picture_url: string;

  @Expose()
  language: Lang;

  @Expose()
  me: Boolean;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
