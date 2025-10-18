import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compareSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AuthStrategy } from './auth.provider';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UtilsService } from 'src/utils/utils.service';
import nodemailer from 'nodemailer';
import { error } from 'console';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

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
      const { _, ...result } = user as any;
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

  async forgotPassword(email: string) {

    const otp = this.utilsService.generateOTP();


    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException({
        error: "User not found",
        message: `User with email '${email}' was not found.`,
        status: 404
      });
    }
    console.log()
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.MAIL,
            pass: process.env.MAIL_PASSWORD
        }
    });
    const mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: email,
        subject: "Votre code de reinitialisation de mot de passe",
        html: `Bonjour, Saisissez ce code pour reinitialiser votre mot de passe ${otp}`
    };

    console.log(`Sending mail to - ${email}`);
    transporter.sendMail(mailOptions, (error, info)=> {
        if (error) {
            console.log(error);
        } else {
          this.usersService.update(user.id, {otp_code: otp});
          console.log('Email sent: ' + info.response);
        }
    });

  }

  async restPassword(email: string, otp: string, newPassword: string) {
    const user = await this.usersService.findOneByEmailOtp(email, otp);

    if (!user) {
      throw new NotFoundException({
        error: "Unvalide otp",
        message: `User with email '${email}' and otp '${otp}' was not found.`,
        status: 404
      });
    }
    this.usersService.update(user.id, {password: await this.utilsService.hashPassword(newPassword)});
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

  async fortytwoLogin(req: any): Promise<null | any> {
    if (!req.user) {
      throw new BadRequestException('Unauthenticated');
    }
    let user = await this.usersService.findOneByAuthProvider(
      req.user.email,
      AuthStrategy.FORTYTWO,
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
        auth_strategy: AuthStrategy.FORTYTWO
      };

      user = await this.usersService.create(newUser);
    }
    console.log(`User: ${user}`);
    
    const payload = { sub: user?.id, username: user?.username };

    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  async githubLogin(req: any): Promise<null | any> {
    if (!req.user) {
      throw new BadRequestException('Unauthenticated');
    }
    let user = await this.usersService.findOneByAuthProvider(
      req.user.email,
      AuthStrategy.GITHUB,
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
        auth_strategy: AuthStrategy.GITHUB
      };

      user = await this.usersService.create(newUser);
    }
    console.log(`User: ${user}`);
    
    const payload = { sub: user?.id, username: user?.username };

    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  async gitlabLogin(req: any): Promise<null | any> {
    if (!req.user) {
      throw new BadRequestException('Unauthenticated');
    }
    let user = await this.usersService.findOneByAuthProvider(
      req.user.email,
      AuthStrategy.GITLAB,
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
        auth_strategy: AuthStrategy.GITLAB
      };

      user = await this.usersService.create(newUser);
    }
    console.log(`User: ${user}`);
    
    const payload = { sub: user?.id, username: user?.username };

    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  async discordLogin(req: any): Promise<null | any> {
    if (!req.user) {
      throw new BadRequestException('Unauthenticated');
    }
    let user = await this.usersService.findOneByAuthProvider(
      req.user.email,
      AuthStrategy.DISCORD,
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
        auth_strategy: AuthStrategy.DISCORD
      };

      user = await this.usersService.create(newUser);
    }
    console.log(`User: ${user}`);
    
    const payload = { sub: user?.id, username: user?.username };

    return {
      access_token: this.jwtService.sign(payload)
    };
  }
  async spotifyLogin(req: any): Promise<null | any> {
    if (!req.user) {
      throw new BadRequestException('Unauthenticated');
    }
    let user = await this.usersService.findOneByAuthProvider(
      req.user.email,
      AuthStrategy.SPOTIFY,
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
        auth_strategy: AuthStrategy.SPOTIFY
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
