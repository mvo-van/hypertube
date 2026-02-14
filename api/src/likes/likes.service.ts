import { ConflictException, Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { Like } from './entities/like.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { TypeStrategy } from 'src/movies/movies.provider';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
    private readonly usersService: UsersService,


  ) { }

  async create(createLikeDto: CreateLikeDto, userId: number): Promise<Like> {
    try {
      const like = this.likeRepository.create(createLikeDto);

      const user = await this.usersService.findOne(userId);
      if (user) {
        like.user = user;
      }
      else {
        throw new ConflictException("User doesn't exist");
      }
      return await this.likeRepository.save(like);
    } catch (e) {
      console.log(e)
      throw new ConflictException('Like conflict');
    }
  }

  async findOneByMovieIdUserId(type: TypeStrategy, movieId: string, userId: number) {
    const user = await this.usersService.findOne(userId);
    if (user) {
      return await this.likeRepository.findOneBy({
        type: type, movie_id: movieId, user: user
      });
    }
  }

  findAll() {
    return `This action returns all likes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} like`;
  }

  update(id: number, updateLikeDto: UpdateLikeDto) {
    return `This action updates a #${id} like`;
  }

  remove(id: number) {
    return `This action removes a #${id} like`;
  }
}
