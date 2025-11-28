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
  Logger,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { SelfUserResponseDto } from './dto/self-user-response.dto';
import { ActivateUserDto } from './dto/activate-user-dto';
import { ValidateUserDto } from './dto/validate-user.dto';
import { UserParam } from 'src/auth/decorators/user-param.decorator';
import { JwtUser } from 'src/auth/interfaces/jwt-user.interface';
import { Response } from 'express';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const createdUser = await this.usersService.create(createUserDto);
    return new UserResponseDto(createdUser);
  }

  @Get('/test')
  test(@UserParam() user: JwtUser) {
    console.log(user);
    return user;
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/me')
  async findMe(@UserParam('userId') userId: number) {
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
    @UserParam('userId') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.usersService.update(userId, updateUserDto);
    return new UserResponseDto(user as User);
  }

  @Delete('/me')
  async remove(@Res() res: Response, @UserParam('userId') userId: number) {
    await this.usersService.remove(userId);
    res.clearCookie('access_token');
    res.json({
      message: 'User has been succesfully deleted',
    });
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
  @Post('/activate')
  async activate(@Body() activateUserDto: ActivateUserDto) {
    const { username } = activateUserDto;

    this.logger.log(`Sending activation email to ${username}`);
    await this.usersService.activate(username);
    this.logger.log(`Activation email has been sent to ${username}`);
    return {
      message: 'otp has been sent',
    };
  }

  @Public()
  @Post('/validate')
  async validate(@Body() validateUserDto: ValidateUserDto) {
    const { username, otp_code } = validateUserDto;

    this.logger.log(`Validating user ${username}`);
    await this.usersService.validate(username, otp_code);
    this.logger.log(`User ${username} has been validated`);
    return {
      message: 'User has been activated.',
    };
  }
}
