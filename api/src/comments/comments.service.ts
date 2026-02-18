import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { TypeStrategy } from 'src/movies/movies.provider';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private readonly usersService: UsersService,

  ) { }

  async create(createCommentDto: CreateCommentDto, userId: number): Promise<Comment> {
    const comment = this.commentRepository.create(createCommentDto);
    const user = await this.usersService.findOne(userId);
    comment.published_date = new Date(Date.now())
    if (user) {
      comment.user = user;
    }
    else {
      throw new ConflictException("User doesn't exist");
    }
    return await this.commentRepository.save(comment);
  }

  async findAllCommentFromMovieId(type, movie_id): Promise<Comment[]> {
    return this.commentRepository.find({
      order: { published_date: "ASC" },
      where: [{ movieType: type, movie_id: movie_id }],
      relations: ['user'],
    });
  }

  async findAllCommentFromUserId(userId: number): Promise<Comment[]> {
    return this.commentRepository.find({
      order: { published_date: "ASC" },
      where: [{ user_id: userId }]
    });
  }

  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find({
      // relations: ['user'],
    });
  }

  async findOne(id: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }

    return comment;
  }

  async update(
    id: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    const comment = await this.findOne(id);
    const updated = Object.assign(comment, updateCommentDto);
    return await this.commentRepository.save(updated);
  }

  async remove(id: string): Promise<void> {
    const result = await this.commentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }
  }
}
