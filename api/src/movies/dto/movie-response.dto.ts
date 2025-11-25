import { Exclude, Expose } from 'class-transformer';
import { Movie } from '../entities/movie.entity';

@Exclude()
export class MovieResponseDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  year: string;

  @Expose()
  released: string;

  @Expose()
  runtime: string;

  @Expose()
  genre: string;

  @Expose()
  director: string;

  @Expose()
  writer: string;

  @Expose()
  actors: string;

  @Expose()
  plot: string;

  @Expose()
  language: string;

  @Expose()
  country: string;

  @Expose()
  poster: string;

  @Expose()
  metascore: string;

  @Expose()
  type: string;

  @Expose()
  local_path: string;

  @Expose()
  views: number;

  constructor(partial: Partial<Movie>) {
    Object.assign(this, partial);
  }
}
