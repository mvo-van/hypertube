import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserResponseDto } from './dto/user-response.dto';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly utilsService: UtilsService,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);

    user.password = await this.utilsService.hashPassword(user.password);
    return await this.userRepository.save(user); //TODO gerer le cas conflit username 
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ username: username });
  }

  findAll() {
    throw new Error('Not implemented');
  }

  async findOne(id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({
      id: id,
      is_active: true
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    throw new Error('Not implemented');
  }

  remove(id: number) {
    throw new Error('Not implemented');
  }
}
