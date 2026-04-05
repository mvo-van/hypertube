import { Lang } from '../../lang/lang';
import { Exclude, Expose } from 'class-transformer';
import { User } from '../entities/user.entity';
import { AuthStrategy } from 'src/auth/auth.provider';

@Exclude()
export class SelfUserResponseDto {
  @Expose()
  id: number;

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

  @Expose()
  auth_strategy: AuthStrategy;

  @Expose()
  show_name: boolean;

  @Expose()
  show_watch: boolean;

  @Expose()
  show_watchlist: boolean;


  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
