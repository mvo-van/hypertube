import { Lang } from '../../lang/lang';
import { Exclude, Expose } from 'class-transformer';
import { User } from '../entities/user.entity';

@Exclude()
export class SelfUserResponseDto {
  @Expose()
  username: string;

  @Expose()
  first_name: string;

  @Expose()
  last_name: string;

  @Expose()
  email: string;

  @Expose()
  profile_picture_url: string;

  @Expose()
  language: Lang;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
