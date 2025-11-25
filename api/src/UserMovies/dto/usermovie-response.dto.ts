import { Exclude, Expose } from 'class-transformer';
import { UserMovie } from '../entities/usermovie.entity';
import { User } from '../../users/entities/user.entity';
import { Movie } from '../../movies/entities/movie.entity';

@Exclude()
export class UserMovieResponseDto {
  @Expose()
  id: number;

  @Expose()
  user_id: number;

  @Expose()
  movie_id: number;

  @Expose()
  watch_offset: number;

  @Expose()
  watch_date: Date;

  @Expose()
  finished: boolean;

  @Expose()
  user?: Partial<User>;

  @Expose()
  movie?: Partial<Movie>;

  constructor(partial: Partial<UserMovie>) {
    Object.assign(this, partial);
  }
}
