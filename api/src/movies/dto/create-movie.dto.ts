import { IsNotEmpty, IsString, MaxLength, IsInt } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  title: string;

  @IsString()
  @MaxLength(4)
  @IsNotEmpty()
  year: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  released: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  runtime: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  genre: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  director: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  writer: string;

  @IsString()
  @MaxLength(500)
  @IsNotEmpty()
  actors: string;

  @IsString()
  @MaxLength(500)
  @IsNotEmpty()
  plot: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  language: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  country: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  poster: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  metascore: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  type: string;

  @IsString()
  @MaxLength(500)
  @IsNotEmpty()
  local_path: string;

  @IsInt()
  views: number;
}
