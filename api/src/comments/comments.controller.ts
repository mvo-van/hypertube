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
  Res,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentResponseDto } from './dto/comment-response.dto';
import { UserParam } from 'src/auth/decorators/user-param.decorator';
import { TypeStrategy } from 'src/movies/movies.provider';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { as } from '@faker-js/faker/dist/airline-DF6RqYmq';

@Controller('comments')
@UseInterceptors(ClassSerializerInterceptor)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService,
    private readonly configService: ConfigService,

  ) { }

  @Post()
  async create(
    @Body() createCommentDto: CreateCommentDto, @UserParam('userId') userId: number
  ): Promise<CommentResponseDto> {
    const createdComment = await this.commentsService.create(createCommentDto, userId);
    return new CommentResponseDto(createdComment);
  }

  @Get("/movie/:type/:movie_id")
  async findAllCommentFromMovieId(@Param('type') type: TypeStrategy, @Param('movie_id') movie_id: string) {
    const comments = await this.commentsService.findAllCommentFromMovieId(type, movie_id);
    return comments.map((comment) => { return { id: comment.id, message: comment.content, userName: comment.user.username, userId: comment.user.id, imgUser: comment.user.profile_picture_url } });
  }

  @Get("/user/:userId")
  async findAllCommentFromUserId(@Param('userId') userId: number, @Res() res: Response) {
    try {
      const TMDB_API_KEY = this.configService.get<string>('TMDB_API_KEY');
      const comments = await this.commentsService.findAllCommentFromUserId(userId);
      const commentList = comments.map(async (elem) => {
        if (elem.movieType == TypeStrategy.MOVIE) {
          const movie_info = await axios.get(`https://api.themoviedb.org/3/movie/${elem.movie_id}?api_key=${TMDB_API_KEY}`)
          return { movieType: elem.movieType, movieId: elem.movie_id, id: elem.id, message: elem.content, urlImg: `https://image.tmdb.org/t/p/original/${movie_info.data.poster_path}` }
        }
        if (elem.movieType == TypeStrategy.EPISODE) {
          const idList = elem.movie_id.split("_")
          const season_info = await axios.get(`https://api.themoviedb.org/3/tv/${idList[0]}/season/${idList[1]}?api_key=${TMDB_API_KEY}`)
          return { serieId: idList[0], seasonId: idList[1], episodeId: idList[2], movieType: elem.movieType, movieId: elem.movie_id, id: elem.id, message: elem.content, urlImg: `https://image.tmdb.org/t/p/original/${season_info.data.poster_path}` }
        }
        return {}
      })
      res.send(await Promise.all(commentList));
    }
    catch (e) {
      res.send({ message: 'Movie not detected successfully' })
    }
  }

  @Get()
  async findAll(): Promise<CommentResponseDto[]> {
    const comments = await this.commentsService.findAll();
    return comments.map((comment) => new CommentResponseDto(comment));
  }


  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<CommentResponseDto> {
    const updatedComment = await this.commentsService.update(
      id,
      updateCommentDto,
    );
    return new CommentResponseDto(updatedComment);
  }

  @Delete("/allUserComments")
  async removeAllCommentsFromUser(@UserParam('userId') userId: number) {
    const comments = await this.commentsService.findAllCommentFromUserId(+userId);
    if (comments) {
      comments.forEach((elem) => {
        this.commentsService.remove(elem.id);
      })
    }
    return { message: 'All comments deleted successfully' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.commentsService.remove(id);
    return { message: 'Comment deleted successfully' };
  }
}
