import { ConflictException, Injectable } from '@nestjs/common';
import { CreateWatchedDto } from './dto/create-watched.dto';
import { UpdateWatchedDto } from './dto/update-watched.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Watched } from './entities/watched.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { WatchedResponseDto } from './dto/response-watched.dto';

@Injectable()
export class WatchedService {
  constructor(
    @InjectRepository(Watched)
    private watchedRepository: Repository<Watched>,
    private readonly usersService: UsersService,

  ) { }
  async create(createWatchedDto: CreateWatchedDto, userId: number): Promise<WatchedResponseDto> {
    const watch = this.watchedRepository.create(createWatchedDto);
    const user = await this.usersService.findOne(userId);
    watch.is_watched = true
    if (user) {
      watch.user = user;
      return new WatchedResponseDto(await this.watchedRepository.save(watch));
    }
    else {
      throw new ConflictException("User doesn't exist");
    }
  }

  findAll() {
    return `This action returns all watched`;
  }

  findOneByUserIdMovieId(movieType, movie_id, userId) {
    return this.watchedRepository.findOne({
      where: {
        user_id: userId,
        movieType: movieType,
        movie_id: movie_id
      }
    })
  }

  findByUserId(userId) {
    return this.watchedRepository.find({
      where: {
        user_id: userId
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} watched`;
  }

  async update(updateWatched: Watched) {
    return await this.watchedRepository.save(updateWatched);
  }

  remove(id: number) {
    return `This action removes a #${id} watched`;
  }
}
