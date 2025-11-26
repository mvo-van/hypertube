import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compareSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AuthStrategy } from './auth.provider';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UtilsService } from 'src/utils/utils.service';
import nodemailer from 'nodemailer';
import juice from 'juice';
import { AuthModule } from './auth.module';
import { UserDto } from './dto/user.dto';
import { IUser } from './interfaces/user.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthModule.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly utilsService: UtilsService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(username: string, pass: string): Promise<IUser | null> {
    const user = await this.usersService.findOneByUsername(username);

    if (user && compareSync(pass, user.password)) {
      const { _, ...result } = user;
      return result;
    }
    return null;
  }

  login(user: UserDto) {
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
        error: 'User not found',
        message: `User with email '${email}' was not found.`,
        status: 404,
      });
    }
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: this.configService.get<string>('MAIL'),
        pass: this.configService.get<string>('MAIL_PASSWORD'),
      },
    });

    const mailOptions = {
      from: process.env.MAIL_USERNAME,
      to: email,
      subject: 'Votre code de reinitialisation de mot de passe',
      html: this.makeForgotPaswordEmail(otp),
    };

    this.logger.log(`Sending mail to - ${email}`);
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        this.logger.error(error);
      } else {
        this.usersService.update(user.id, { otp_code: otp });
        this.logger.log('Email sent: ' + info.response);
      }
    });
  }

  async restPassword(email: string, otp: string, newPassword: string) {
    const user = await this.usersService.findOneByEmailOtp(email, otp);

    if (!user || otp.length != 6) {
      throw new NotFoundException({
        error: 'Invalid OTP password',
        message: `User with email '${email}' and otp '${otp}' was not found.`,
        status: 404,
      });
    }
    await this.usersService.update(user.id, {
      password: await this.utilsService.cipherPassword(newPassword),
      otp_code: '',
    });
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
        auth_strategy: AuthStrategy.GOOGLE,
      };

      user = await this.usersService.create(newUser);
    }
    const payload = { sub: user?.id, username: user?.username };

    return {
      access_token: this.jwtService.sign(payload),
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
        auth_strategy: AuthStrategy.FORTYTWO,
      };

      user = await this.usersService.create(newUser);
    }

    const payload = { sub: user?.id, username: user?.username };

    return {
      access_token: this.jwtService.sign(payload),
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
        auth_strategy: AuthStrategy.GITHUB,
      };

      user = await this.usersService.create(newUser);
    }

    const payload = { sub: user?.id, username: user?.username };

    return {
      access_token: this.jwtService.sign(payload),
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
        auth_strategy: AuthStrategy.GITLAB,
      };

      user = await this.usersService.create(newUser);
    }

    const payload = { sub: user?.id, username: user?.username };

    return {
      access_token: this.jwtService.sign(payload),
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
        auth_strategy: AuthStrategy.DISCORD,
      };

      user = await this.usersService.create(newUser);
    }

    const payload = { sub: user?.id, username: user?.username };

    return {
      access_token: this.jwtService.sign(payload),
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
        auth_strategy: AuthStrategy.SPOTIFY,
      };

      user = await this.usersService.create(newUser);
    }

    const payload = { sub: user?.id, username: user?.username };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private makeForgotPaswordEmail(otp: string): string {
    const htmlTemplate = `
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Code de réinitialisation</title>
    <style>
      body { margin:0; padding:0; background:#f6f9fc; color:#1a202c; }
      .wrapper { width:100%; padding:24px; background:#f6f9fc; }
      .container { max-width:600px; margin:0 auto; background:#ffffff; border-radius:8px; overflow:hidden; }
      .content { padding:24px 24px 8px; font-size:15px; line-height:1.6; }
      .otp {
        display:block;
        font-family: Menlo, Consolas, Monaco, monospace;
        font-weight: 800;
        letter-spacing: 4px;
        font-size: 28px;
        text-align: center;
        color:#111827;
        background:#f3f4f6;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 16px 20px;
        margin: 16px 0 8px;
      }
      .muted { color:#6b7280; font-size:13px; text-align:center; }
      @media (prefers-color-scheme: dark) {
        body { background:#0b1220; color:#e5e7eb; }
        .container { background:#0f172a; }
        .content { color:#e5e7eb; }
        .otp { background:#0b1220; border-color:#233044; color:#e5e7eb; }
        .muted { color:#94a3b8; }
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="container" role="article" aria-roledescription="email">
        <div class="content">
          <p>Bonjour,</p>
          <p>Voici votre code de vérification pour réinitialiser votre mot de passe:</p>
          <span class="otp">${otp}</span>
          <p class="muted">Si vous n'êtes pas à l'origine de cette demande, ignorez simplement cet e-mail.</p>
        </div>
      </div>
    </div>
  </body>
</html>`;

    return juice(htmlTemplate);
  }
}
