import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { faker } from '@faker-js/faker';
import { User } from 'src/users/entities/user.entity';
import { UtilsService } from 'src/utils/utils.service';
import { MIN_LENGTH_PASSWORD } from 'src/users/constants';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthStrategy } from 'src/auth/auth.provider';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MockDataService {
  private readonly logger = new Logger(MockDataService.name);
  private readonly total_row = 10;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly usersService: UsersService,
    private readonly utilsService: UtilsService,
  ) {}

  async bootstrap() {
    await this.seedUsers();
  }

  private async seedUsers() {
    const [_, count] = await this.userRepository.findAndCount();
    if (count >= this.total_row) {
      return;
    }
    for (let i = 0; i < this.total_row; i++) {
      const generatedUser = this.createUser();

      try {
        this.logger.log(`Creating: ${JSON.stringify(generatedUser)}`);
        const createdUser = await this.usersService.create(generatedUser);
        await this.userRepository.update(createdUser.id, {
          is_active: true,
        });
      } catch (e) {
        this.logger.error(`Failed to create mock user ${e}`);
      }
    }
    this.logger.log('Successfuly created mock users');
  }

  private createUser(): CreateUserDto {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const username = this.utilsService.makeUsername(firstName, lastName);
    const password = faker.internet.password({
      length: MIN_LENGTH_PASSWORD,
    });
    const email = faker.internet.email({
      firstName: firstName,
      lastName: lastName,
    });
    const profilePicture: string = faker.system.commonFileName('jpeg');

    return {
      first_name: firstName,
      last_name: lastName,
      username: username,
      password: password,
      email: email,
      profile_picture: profilePicture,
      auth_strategy: AuthStrategy.LOCAL,
    };
  }
}
