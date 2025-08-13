import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserMovie } from './entities/usermovie.entity';
import { CreateUserMovieDto } from './dto/create-usermovie.dto';
import { UpdateUserMovieDto } from './dto/update-usermovie.dto';

@Injectable()
export class UserMoviesService {
  constructor(
    @InjectRepository(UserMovie)
    private readonly userMovieRepository: Repository<UserMovie>,
  ) {}

  async create(createUserMovieDto: CreateUserMovieDto): Promise<UserMovie> {
    const userMovie = this.userMovieRepository.create(createUserMovieDto);
    return await this.userMovieRepository.save(userMovie);
  }

  async findAll(): Promise<UserMovie[]> {
    return await this.userMovieRepository.find({
      relations: ['user', 'movie'], // utile pour charger les objets liés
    });
  }

  async findOne(id: number): Promise<UserMovie> {
    const userMovie = await this.userMovieRepository.findOne({
      where: { id },
      relations: ['user', 'movie'],
    });
    if (!userMovie) throw new NotFoundException(`UserMovie #${id} not found`);
    return userMovie;
  }

  async update(
    id: number,
    updateUserMovieDto: UpdateUserMovieDto,
  ): Promise<UserMovie> {
    const userMovie = await this.findOne(id);
    Object.assign(userMovie, updateUserMovieDto);
    return await this.userMovieRepository.save(userMovie);
  }

  async remove(id: number): Promise<void> {
    const result = await this.userMovieRepository.delete(id);
    if (!result.affected)
      throw new NotFoundException(`UserMovie #${id} not found`);
  }
}
