import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { WatchedService } from './watched.service';
import { CreateWatchedDto } from './dto/create-watched.dto';
import { UpdateWatchedDto } from './dto/update-watched.dto';
import { UserParam } from 'src/auth/decorators/user-param.decorator';
import { TypeStrategy } from 'src/movies/movies.provider';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';

@Controller('watched')
export class WatchedController {
  constructor(private readonly watchedService: WatchedService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) { }

  @Post("/addWatch")
  async createAddWatch(@Body() createWatchedDto: CreateWatchedDto, @UserParam('userId') userId: number) {
    const resLike = await this.watchedService.findOneByUserIdMovieId(createWatchedDto.movieType, createWatchedDto.movie_id, userId);
    if (resLike) {
      if (!resLike.is_watched) {
        resLike.is_watched = true
        return this.watchedService.update(resLike)
      }
    }
    else {
      return this.watchedService.create(createWatchedDto, userId);
    }
  }

  @Post("/timeWatchedUpdate")
  async createTimeWatchedUpdate(@Body() createWatchedDto: CreateWatchedDto, @UserParam('userId') userId: number) {
    const resLike = await this.watchedService.findOneByUserIdMovieId(createWatchedDto.movieType, createWatchedDto.movie_id, userId);
    if (resLike) {
      if (!resLike.is_watched) {
        if (createWatchedDto.time) {
          resLike.time = createWatchedDto.time;
        }
        return this.watchedService.update(resLike)
      }
    }
    else {
      return this.watchedService.create(createWatchedDto, userId);
    }
  }

  @Get("/findWatchList/:userId")
  async findAllWatchListByUserId(@Param('userId') userId: number, @UserParam('userId') me: number, @Res() res: Response) {
    try {
      const user = await this.usersService.findOne(userId)
      if (user?.show_watchlist || userId == me) {
        const myWatchList = await this.watchedService.findByUserId(userId);
        const TMDB_API_KEY = this.configService.get<string>('TMDB_API_KEY');
        const listWatchList = myWatchList.filter((elem) => elem.movieType == TypeStrategy.SEASON || elem.movieType == TypeStrategy.MOVIE).slice(0, 20).map(async (elem) => {
          if (elem.movieType == TypeStrategy.MOVIE) {
            const movie_info = await axios.get(`https://api.themoviedb.org/3/movie/${elem.movie_id}?api_key=${TMDB_API_KEY}`)
            return {
              pathNavigate: `/movie/${elem.movie_id}`,
              movieType: elem.movieType,
              movieId: elem.movie_id,
              id: elem.id,
              date: parseInt(movie_info.data.release_date),
              name: movie_info.data.title,
              see: elem.is_watched,
              urlImg: `https://image.tmdb.org/t/p/original/${movie_info.data.poster_path}`
            }
          }
          if (elem.movieType == TypeStrategy.SEASON) {
            const idList = elem.movie_id.split("_")
            const season_info = await axios.get(`https://api.themoviedb.org/3/tv/${idList[0]}/season/${idList[1]}?api_key=${TMDB_API_KEY}`)
            const serie_info = await axios.get(`https://api.themoviedb.org/3/tv/${idList[0]}?api_key=${TMDB_API_KEY}`)
            return {
              pathNavigate: `/serie/${idList[0]}/season/${idList[1]}`,
              serieId: idList[0],
              seasonId: idList[1],
              movieType: elem.movieType,
              movieId: elem.movie_id,
              id: elem.id,
              see: elem.is_watched,
              name: `${serie_info.data.name} (${season_info.data.name})`,
              date: parseInt(season_info.data.air_date),
              urlImg: `https://image.tmdb.org/t/p/original/${season_info.data.poster_path}`
            }
          }
        })
        res.send(await Promise.all(listWatchList))
      } else {
        res.send([])
      }
    } catch (e) {
      res.send({ message: 'Watchlist not detected successfully' })
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.watchedService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateWatchedDto: UpdateWatchedDto) {
  //   return this.watchedService.update(+id, updateWatchedDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.watchedService.remove(+id);
  }
}
