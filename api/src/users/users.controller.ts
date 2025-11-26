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
  Head,
  Request,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { SelfUserResponseDto } from './dto/self-user-response.dto';
import { ValidateUserDto } from './dto/validate-user-dto';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const createdUser = await this.usersService.create(createUserDto);
    return new UserResponseDto(createdUser);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/me')
  async findMe(@Req() req: Request) {
    const { userId } = req.user;
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return new SelfUserResponseDto(user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.usersService.findOne(+id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return new UserResponseDto(user);
  }

  @Patch('/me')
  async update(
    @Req() req: Request,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const id = req.user.userId;
    const user = await this.usersService.update(id, updateUserDto);
    return new UserResponseDto(user as User);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Public()
  @Head('/username/:username')
  async usernameExist(@Param('username') username: string) {
    const user = await this.usersService.findOneByUsername(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
  }

  @Public()
  @Head('/email/:email')
  async emailExist(@Param('email') email: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
  }

  @Public()
  @Post('/validate')
  async validate(@Body() validateUserDto: ValidateUserDto) {
    const { username } = validateUserDto;
    await this.usersService.validate(username);
  }
}
