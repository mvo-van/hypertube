import { IsInt, IsString, MaxLength, IsNotEmpty, IsEnum } from 'class-validator';
import { TypeStrategy } from 'src/movies/movies.provider';

export class CreateCommentDto {
  @IsString()
  movie_id: string;

  @IsString()
  @MaxLength(500)
  @IsNotEmpty()
  content: string;

  @IsEnum(TypeStrategy)
  @IsNotEmpty()
  movieType: TypeStrategy;

}
