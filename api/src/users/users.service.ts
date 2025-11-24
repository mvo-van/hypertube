import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserResponseDto } from './dto/user-response.dto';
import { UtilsService } from '../utils/utils.service';
import { AuthStrategy } from 'src/auth/auth.provider';
import bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly utilsService: UtilsService,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);

    if (user.password != null) {
      user.password = await this.utilsService.cipherPassword(user.password);
    }
    return await this.userRepository.save(user); //TODO gerer le cas conflit username
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ username: username });
  }

  async findOneByAuthProvider(email: string, authProvider: AuthStrategy) {
    return await this.userRepository.findOneBy({
      email: email,
      auth_strategy: authProvider,
    });
  }

  async findAll() {
    return await this.userRepository.find({
      select: {
        username: true,
        profile_picture_url: true,
        id: true,
        first_name: true,
        last_name: true,
      },
      where: {
        is_active: true,
      },
    });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email: email });
  }

  async findOneByEmailOtp(email: string, otp: string) {
    return await this.userRepository.findOneBy({ email: email, otp_code: otp });
  }

  async findOne(id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({
      id: id,
      is_active: true,
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    if (bcrypt.compareSync(updateUserDto.password as string, user.password)) {
      throw new ConflictException(
        'Unable to update the password: the new password must be different from the previous one.',
      );
    }
    await this.userRepository.update(id, {
      ...updateUserDto,
      password: await this.utilsService.cipherPassword(
        updateUserDto.password as string,
      ),
    });
    return await this.findOne(id);
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }
}
