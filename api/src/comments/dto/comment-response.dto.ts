import { Exclude, Expose } from 'class-transformer';
import { Comment } from '../entities/comment.entity';
import { User } from '../../users/entities/user.entity';
import { Movie } from '../../movies/entities/movie.entity';

@Exclude()
export class CommentResponseDto {
  @Expose()
  id: string;

  @Expose()
  content: string;

  @Expose()
  published_date: Date;

  @Expose()
  user_id: number;

  @Expose()
  movie_id: number;

  @Expose()
  user?: Partial<User>;

  @Expose()
  movie?: Partial<Movie>;

  constructor(partial: Partial<Comment>) {
    Object.assign(this, partial);
  }
}
