import { IsInt, IsString, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsInt()
  user_id: number;

  @IsInt()
  movie_id: number;

  @IsString()
  @MaxLength(500)
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  published_date: Date;
}
