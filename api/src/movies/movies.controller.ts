import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieResponseDto } from './dto/movie-response.dto';

@Controller('movies')
@UseInterceptors(ClassSerializerInterceptor)
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  async create(
    @Body() createMovieDto: CreateMovieDto,
  ): Promise<MovieResponseDto> {
    const createdMovie = await this.moviesService.create(createMovieDto);
    return new MovieResponseDto(createdMovie);
  }

  @Get()
  async findAll(): Promise<MovieResponseDto[]> {
    const movies = await this.moviesService.findAll();
    return movies.map((movie) => new MovieResponseDto(movie));
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<MovieResponseDto> {
    const movie = await this.moviesService.findOne(+id);
    return new MovieResponseDto(movie);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() UpdateMovieDto: UpdateMovieDto,
  ): Promise<MovieResponseDto> {
    const movie = await this.moviesService.update(+id, UpdateMovieDto);
    return new MovieResponseDto(movie);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.moviesService.remove(+id);
    return { message: 'Movie deleted successfully' };
  }
}
