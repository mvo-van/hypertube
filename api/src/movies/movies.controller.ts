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
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieResponseDto } from './dto/movie-response.dto';
import { ConfigService } from '@nestjs/config';
import { Public } from 'src/auth/decorators/public.decorator';
import axios from "axios";
import { LikesService } from 'src/likes/likes.service';
import { TypeStrategy } from './movies.provider';
import { UserParam } from 'src/auth/decorators/user-param.decorator';

@Controller('movies')
@UseInterceptors(ClassSerializerInterceptor)
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly configService: ConfigService,
    private readonly likeService: LikesService
  ) { }

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
  async getMovieInfo(@Param('id') id: number, @Res() res: Response, @UserParam('userId') userId: number) {
    const TMDB_API_KEY = this.configService.get<string>('TMDB_API_KEY');
    try {
      const isLike = await this.likeService.findOneByMovieIdUserId(TypeStrategy.MOVIE, `${id}`, userId)
      let like = false
      if (isLike) {
        like = true
      }
      const movie_info = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}`)
      const genres = movie_info.data.genres.map((x) => x.name)
      const studios = movie_info.data.production_companies.slice(0, 6).map((x) => x.name)
      const movie_credits_info = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${TMDB_API_KEY}`)
      const cast = movie_credits_info.data.cast.slice(0, 6).map((x) => x.name)
      const screenwriters = movie_credits_info.data.crew.map((x) => {
        if (x.department == "Writing") { return x.name }
      }).filter((writer) => writer).slice(0, 6)
      const producers = movie_credits_info.data.crew.map((x) => {
        if (x.job == "Executive Producer" || x.job == "Producer") { return x.name }
      }).filter((produceur) => produceur).slice(0, 6)

      res.send({
        imdb_id: movie_info.data.imdb_id,
        type: "movie",
        time: movie_info.data.runtime,
        date: parseInt(movie_info.data.release_date),
        note: Number((movie_info.data.vote_average).toFixed(1)),
        see: false, // todo
        download: false, // todo
        like: like,
        id: movie_info.data.id,
        name: movie_info.data.original_title,
        synopsis: movie_info.data.overview,
        poster: `https://image.tmdb.org/t/p/original/${movie_info.data.poster_path}`,
        banner: `https://image.tmdb.org/t/p/original/${movie_info.data.backdrop_path}`,
        timeStart: 0, // todo sauvegarde de la minute du dernier visionage
        genres: genres,
        actors: cast,
        producers: producers,
        screenwriters: screenwriters,
        studios: studios
      });
    } catch (error) {
      return { message: 'Movie not detected successfully' }
    }
  }

  @Get('serie/:id')
  async getSerieInfo(@Param('id') id: number, @Res() res: Response, @UserParam('userId') userId: number) {
    const TMDB_API_KEY = this.configService.get<string>('TMDB_API_KEY');
    try {
      const isLike = await this.likeService.findOneByMovieIdUserId(TypeStrategy.SERIE, `${id}`, userId)
      let like = false
      if (isLike) {
        like = true
      }
      const serie_info = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${TMDB_API_KEY}`)
      const genres = serie_info.data.genres.map((x) => x.name)
      const studios = serie_info.data.production_companies.slice(0, 6).map((x) => x.name)
      const seasons = serie_info.data.seasons.map((x) => {
        return {
          serie_id: serie_info.data.id,
          see: true, // todo
          seasonNbr: x.season_number,
          poster: `https://image.tmdb.org/t/p/original/${x.poster_path}`,
          date: parseInt(x.air_date)
        }
      })
      const serie_credits_info = await axios.get(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${TMDB_API_KEY}`)
      const imdb_id = await axios.get(`https://api.themoviedb.org/3/tv/${id}/external_ids?api_key=${TMDB_API_KEY}`)
      const cast = serie_credits_info.data.cast.slice(0, 6).map((x) => x.name)
      const screenwriters = serie_credits_info.data.crew.map((x) => {
        if (x.department == "Writing") { return x.name }
      }).filter((writer) => writer).slice(0, 6)
      const producers = serie_credits_info.data.crew.map((x) => {
        if (x.job == "Executive Producer" || x.job == "Producer" || x.job == "Director") { return x.name }
      }).filter((produceur) => produceur).slice(0, 6)
      res.send({
        serie_infos: {
          imdb_id: imdb_id.data.imdb_id,
          id: serie_info.data.id,
          name: serie_info.data.name, // ou original_name
          type: "serie",
          dateStart: parseInt(serie_info.data.first_air_date),
          dateEnd: parseInt(serie_info.data.last_air_date),
          note: Number((serie_info.data.vote_average).toFixed(1)),
          nbrSeasons: serie_info.data.number_of_seasons,
          synopsis: serie_info.data.overview,
          poster: `https://image.tmdb.org/t/p/original/${serie_info.data.poster_path}`,
          banner: `https://image.tmdb.org/t/p/original/${serie_info.data.backdrop_path}`,
          like: like,
          genres: genres,
          actors: cast,
          producers: producers,
          screenwriters: screenwriters,
          studios: studios,
        },
        seasons: seasons
      });
    } catch (error) {
      return { message: 'Serie not detected successfully' }
    }
    // return { message: 'Movie detected successfully' };
  }

  @Get('serie/:serie_id/season/:season_number')
  async getSeasonInfo(@Param('serie_id') serie_id: number, @Param('season_number') season_number: number, @Res() res: Response, @UserParam('userId') userId: number) {
    const TMDB_API_KEY = this.configService.get<string>('TMDB_API_KEY');
    try {
      const isLike = await this.likeService.findOneByMovieIdUserId(TypeStrategy.SEASON, `${serie_id}_${season_number}`, userId)
      let like = false
      if (isLike) {
        like = true
      }
      const serie_info = await axios.get(`https://api.themoviedb.org/3/tv/${serie_id}?api_key=${TMDB_API_KEY}`)

      const genres = serie_info.data.genres.map((x) => x.name)
      const studios = serie_info.data.production_companies.slice(0, 6).map((x) => x.name)

      const serie_credits_info = await axios.get(`https://api.themoviedb.org/3/tv/${serie_id}/credits?api_key=${TMDB_API_KEY}`)
      const cast = serie_credits_info.data.cast.slice(0, 6).map((x) => x.name)
      const screenwriters = serie_credits_info.data.crew.map((x) => {
        if (x.department == "Writing") { return x.name }
      }).filter((writer) => writer).slice(0, 6)
      const producers = serie_credits_info.data.crew.map((x) => {
        if (x.job == "Executive Producer" || x.job == "Producer" || x.job == "Director") { return x.name }
      }).filter((produceur) => produceur).slice(0, 6)
      const season_info = await axios.get(`https://api.themoviedb.org/3/tv/${serie_id}/season/${season_number}?api_key=${TMDB_API_KEY}`)
      const episodes = season_info.data.episodes.map((x) => {
        let path_poster = `https://image.tmdb.org/t/p/original/${serie_info.data.backdrop_path}`
        if (x.still_path) {
          path_poster = `https://image.tmdb.org/t/p/w500/${x.still_path}`
        }
        if (new Date(x.air_date) < new Date(Date.now())) {
          return {
            serie_id: serie_info.data.id,
            seasonNbr: season_number,
            synopsis: x.overview,
            note: x.vote_average,
            title: x.name,
            see: true, // to do
            start: 0, // to do
            episodeNbr: x.episode_number,
            poster: path_poster,
            time: parseInt(x.runtime)
          }
        }
      }).filter((elem) => elem)
      res.send({
        season_infos: {
          serie_id: serie_id,
          type: "season",
          date: parseInt(season_info.data.air_date),
          note: Number((season_info.data.vote_average).toFixed(1)),
          nbrEpisodes: season_info.data.episodes.length,
          id: season_info.data._id,
          season: season_info.data.season_number,
          see: false,              //todo
          like: like,
          name: serie_info.data.name,
          synopsis: season_info.data.overview,
          poster: `https://image.tmdb.org/t/p/original/${season_info.data.poster_path}`,
          banner: `https://image.tmdb.org/t/p/original/${serie_info.data.backdrop_path}`,
          genres: genres,
          actors: cast,
          producers: producers,
          screenwriters: screenwriters,
          studios: studios
        },
        episodes: episodes
      });
    } catch (error) {
      return { message: 'Serie not detected successfully' }
    }
    // return { message: 'Movie detected successfully' };
  }

  @Get('serie/:serie_id/season/:season_number/episode/:episode_number')
  async getEpisodeInfo(@Param('serie_id') serie_id: number, @Param('season_number') season_number: number, @Param('episode_number') episode_number: number, @Res() res: Response, @UserParam('userId') userId: number) {
    const TMDB_API_KEY = this.configService.get<string>('TMDB_API_KEY');
    try {
      const isLike = await this.likeService.findOneByMovieIdUserId(TypeStrategy.EPISODE, `${serie_id}_${season_number}_${episode_number}`, userId)
      let like = false
      if (isLike) {
        like = true
      }
      const serie_info = await axios.get(`https://api.themoviedb.org/3/tv/${serie_id}?api_key=${TMDB_API_KEY}`)
      const genres = serie_info.data.genres.map((x) => x.name)
      const studios = serie_info.data.production_companies.slice(0, 6).map((x) => x.name)

      const season_info = await axios.get(`https://api.themoviedb.org/3/tv/${serie_id}/season/${season_number}?api_key=${TMDB_API_KEY}`)

      const episode_info = await axios.get(`https://api.themoviedb.org/3/tv/${serie_id}/season/${season_number}/episode/${episode_number}?api_key=${TMDB_API_KEY}`)

      const imdb_id = await axios.get(`https://api.themoviedb.org/3/tv/${serie_id}/season/${season_number}/episode/${episode_number}/external_ids?api_key=${TMDB_API_KEY}`)
      const producers = episode_info.data.crew.map((x) => {
        if (x.job == "Executive Producer" || x.job == "Producer" || x.job == "Director") { return x.name }
      }).filter((produceur) => produceur).slice(0, 6)
      const screenwriters = episode_info.data.crew.map((x) => {
        if (x.department == "Writing") { return x.name }
      }).filter((writer) => writer).slice(0, 6)
      const cast = episode_info.data.guest_stars.slice(0, 6).map((x) => x.name)
      let path_poster = `https://image.tmdb.org/t/p/original/${serie_info.data.backdrop_path}`
      if (episode_info.data.still_path) {
        path_poster = `https://image.tmdb.org/t/p/w500/${episode_info.data.still_path}`
      }
      res.send({
        episode_infos: {
          imdb_id: imdb_id.data.imdb_id,
          type: "episode",
          time: episode_info.data.runtime,
          date: parseInt(episode_info.data.air_date),
          note: Number((episode_info.data.vote_average).toFixed(1)),
          episode_name: episode_info.data.name,
          name: serie_info.data.name,
          episode: episode_info.data.episode_number,
          season: episode_info.data.season_number,
          see: false, // todo
          download: false, // todo
          like: like, // todo
          id: episode_info.data.id,
          synopsis: episode_info.data.overview,
          poster_episode: episode_info.data.still_path, // todo
          poster: `https://image.tmdb.org/t/p/original/${season_info.data.poster_path}`,
          banner: `https://image.tmdb.org/t/p/original/${serie_info.data.backdrop_path}`,
          genres: genres,
          actors: cast,
          producers: producers,
          screenwriters: screenwriters,
          studios: studios,
          serie_id: serie_id
        }
      });
    } catch (error) {
      return { message: 'Episode not detected successfully' }
    }
    // return { message: 'Movie detected successfully' };
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


  @Get('/top/MovieSerie')
  async getTopMovieSerie(@Res() res: Response) {
    const TMDB_API_KEY = this.configService.get<string>('TMDB_API_KEY');
    try {
      const top_movie = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`)
      const top_serie = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${TMDB_API_KEY}`)
      const top_movie_res = top_movie.data.results.map((elem) => {
        return {
          urlImg: `https://image.tmdb.org/t/p/original/${elem.poster_path}`,
          see: false, // to do
          date: parseInt(elem.release_date),
          pathNavigate: `/movie/${elem.id}`,
          name: elem.title,
          id: elem.id
        }
      })
      const top_serie_res = top_serie.data.results.map((elem) => {
        return {
          urlImg: `https://image.tmdb.org/t/p/original/${elem.poster_path}`,
          see: false,
          date: parseInt(elem.first_air_date),
          pathNavigate: `/serie/${elem.id}`,
          name: elem.name,
          id: elem.id
        }
      })
      res.send({
        topMovie: top_movie_res,
        topSerie: top_serie_res
      });
    } catch (error) {
      return { message: 'Movie not detected successfully' }
    }
  }
}
