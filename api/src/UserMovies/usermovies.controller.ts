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
  ParseIntPipe,
} from '@nestjs/common';
import { UserMoviesService } from './usermovies.service';
import { CreateUserMovieDto } from './dto/create-usermovie.dto';
import { UpdateUserMovieDto } from './dto/update-usermovie.dto';
import { UserMovieResponseDto } from './dto/usermovie-response.dto';

@Controller('user-movies')
@UseInterceptors(ClassSerializerInterceptor)
export class UserMoviesController {
  constructor(private readonly userMoviesService: UserMoviesService) {}

  @Post()
  async create(
    @Body() createUserMovieDto: CreateUserMovieDto,
  ): Promise<UserMovieResponseDto> {
    const createdUserMovie =
      await this.userMoviesService.create(createUserMovieDto);
    return new UserMovieResponseDto(createdUserMovie);
  }

  @Get()
  async findAll(): Promise<UserMovieResponseDto[]> {
    const userMovies = await this.userMoviesService.findAll();
    return userMovies.map((um) => new UserMovieResponseDto(um));
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserMovieResponseDto> {
    const userMovie = await this.userMoviesService.findOne(id);
    return new UserMovieResponseDto(userMovie);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserMovieDto: UpdateUserMovieDto,
  ): Promise<UserMovieResponseDto> {
    const updatedUserMovie = await this.userMoviesService.update(
      id,
      updateUserMovieDto,
    );
    return new UserMovieResponseDto(updatedUserMovie);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.userMoviesService.remove(id);
    return { message: 'UserMovie deleted successfully' };
  }
}
