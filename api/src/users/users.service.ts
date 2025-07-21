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

  async findAll() {
    return await this.userRepository.find({
      select: {
          username: true,
          profile_picture_url: true,
          id: true,
          first_name:true,
          last_name:true,
      },
      where: {
        is_active: true
      },
    });
  }

  async findOne(id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({
      id: id,
      is_active: true
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }
}
