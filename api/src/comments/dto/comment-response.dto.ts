import { Exclude, Expose, Type } from 'class-transformer';
import { Comment } from '../entities/comment.entity';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { TypeStrategy } from 'src/movies/movies.provider';

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
  movie_id: string;

  @Expose()
  movieType: TypeStrategy;

  @Expose()
  @Type(() => UserResponseDto)
  user: UserResponseDto;

  constructor(partial: Partial<Comment>) {
    Object.assign(this, partial);
  }
}
