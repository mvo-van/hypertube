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
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentResponseDto } from './dto/comment-response.dto';

@Controller('comments')
@UseInterceptors(ClassSerializerInterceptor)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CommentResponseDto> {
    const createdComment = await this.commentsService.create(createCommentDto);
    return new CommentResponseDto(createdComment);
  }

  @Get()
  async findAll(): Promise<CommentResponseDto[]> {
    const comments = await this.commentsService.findAll();
    return comments.map((comment) => new CommentResponseDto(comment));
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CommentResponseDto> {
    const comment = await this.commentsService.findOne(id);
    return new CommentResponseDto(comment);
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

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.commentsService.remove(+id);
    return { message: 'Comment deleted successfully' };
  }
}
