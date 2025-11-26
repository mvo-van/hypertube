import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UtilsService } from '../utils/utils.service';
import { AuthStrategy } from 'src/auth/auth.provider';
import bcrypt from 'bcryptjs';
import { MailerService } from '../mailer/mailer.service';
import juice from 'juice';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly utilsService: UtilsService,
    private readonly mailerService: MailerService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = this.userRepository.create(createUserDto);
      if (user.password != null) {
        user.password = await this.utilsService.cipherPassword(user.password);
      }
      return await this.userRepository.save(user);
    } catch {
      throw new ConflictException('User already exists');
    }
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

    if (updateUserDto.password) {
      await this.updatePassword(id, updateUserDto.password);
    }

    try {
      await this.userRepository.update(id, updateUserDto);
    } catch {
      throw new ConflictException('Cannot update');
    }
    return await this.findOne(id);
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }

  async updatePassword(id: number, password: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    if (bcrypt.compareSync(password, user.password)) {
      throw new ConflictException(
        'Unable to update the password: the new password must be different from the previous one.',
      );
    }
    await this.userRepository.update(id, {
      password: await this.utilsService.cipherPassword(password),
    });
  }

  async activate(username: string) {
    const otp = this.utilsService.generateOTP();
    const user = await this.findOneByUsername(username);
    if (!user) {
      throw new NotFoundException({
        error: 'User not found',
        message: `User with username '${username}' was not found`,
      });
    }
    if (user.is_active) {
      throw new BadRequestException('User has already been activated');
    }

    await this.userRepository.update(user.id, { otp_code: otp });

    // TODO: manage email sending exception
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Votre code de validation',
      html: this.makeAccountValidationEmail(otp),
    });
  }

  async validate(username: string, otp_code: string) {
    const user = await this.userRepository.findOneBy({ username: username });

    if (!user) {
      throw new NotFoundException({
        error: 'User not found',
        message: `User with username '${username}' was not found`,
      });
    }
    if (!user.otp_code) {
      throw new UnauthorizedException('User has not been activated');
    }
    if (user.otp_code !== otp_code) {
      throw new BadRequestException("OTP code doesn't match");
    }
    await this.userRepository.update(user.id, {
      is_active: true,
      otp_code: '',
    });
  }

  private makeAccountValidationEmail(otp: string): string {
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
          <p>Voici votre code de validation:</p>
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
