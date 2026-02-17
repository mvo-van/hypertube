import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { UserParam } from 'src/auth/decorators/user-param.decorator';
import { LikeResponseDto } from './dto/like-response.dto';
import { TypeStrategy } from 'src/movies/movies.provider';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) { }

  @Post()
  async create(@Body() createLikeDto: CreateLikeDto, @UserParam('userId') userId: number) {
    const createdLike = await this.likesService.create(createLikeDto, userId);
    return new LikeResponseDto(createdLike)
  }

  @Get()
  findAll() {
    return this.likesService.findAll();
  }

  @Get(':type/:movieId')
  async findOneByMovieIdUserId(@Param('type') type: TypeStrategy, @Param('movieId') movieId: string, @UserParam('userId') userId: number) {
    return this.likesService.findOneByMovieIdUserId(type, movieId, userId);
  }

  @Get("/likeList")
  async findAllMovieAndSeasonLikeByUser(@UserParam('userId') userId: number) {
    return this.likesService.findAllMovieAndSeasonLikeByUser(userId)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLikeDto: UpdateLikeDto) {
    return this.likesService.update(+id, updateLikeDto);
  }

  @Delete('/oneMovie')
  removeByMovieIDAndUser(@Body() deleteLikeDto: CreateLikeDto, @UserParam('userId') userId: number) {
    console.log("here")
    return this.likesService.removeByMovieIDAndUser(deleteLikeDto, userId);
  }

  @Delete('/allUserLikeMovie')
  async removeAllUserLikeMovie(@UserParam('userId') userId: number) {
    const movieLike = await this.likesService.findAllMovieAndSeasonLikeByUser(userId)
    if (movieLike) {
      movieLike.forEach((elem) => this.likesService.remove(+elem.id))
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likesService.remove(+id);
  }
}
