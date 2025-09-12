import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compareSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AuthStrategy } from './auth.provider';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UtilsService } from 'src/utils/utils.service';
import { User } from 'src/users/entities/user.entity';
import { Lang } from 'src/lang/lang';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly utilsService: UtilsService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);

    if (user && compareSync(pass, user.password)) {
      const { _, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any): Promise<any> {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async googleLogin(req: any): Promise<null | any> {
    if (!req.user) {
      throw new BadRequestException('Unauthenticated');
    }
    let user = await this.usersService.findOneByAuthProvider(
      req.user.email,
      AuthStrategy.GOOGLE,
    );

    if (user != null) {
      // Create user
      const newUser: CreateUserDto = {
        username: this.utilsService.makeUsername(
          req.user.first_name,
          req.user.last_name,
        ),
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        profile_picture_url: req.user.picture,
        auth_strategy: AuthStrategy.GOOGLE
      };

      user = await this.usersService.create(newUser);
    }
    console.log(`User: ${user}`);
    
    const payload = { sub: user?.id, username: user?.username };

    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
