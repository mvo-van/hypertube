import { IsInt, IsDateString, IsBoolean } from 'class-validator';

export class CreateUserMovieDto {
  @IsInt()
  user_id: number;

  @IsInt()
  movie_id: number;

  @IsInt()
  watch_offset: number;

  @IsDateString()
  watch_date: Date;

  @IsBoolean()
  finished: boolean;
}
