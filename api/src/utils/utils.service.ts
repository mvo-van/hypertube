import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { genSalt, hash } from 'bcryptjs';

@Injectable()
export class UtilsService {
  constructor(private config: ConfigService) {}

  async cipherPassword(password: string): Promise<string> {
    const rounds = this.config.get<number>('BCRYPT_SALT_ROUNDS');
    const salt = await genSalt(rounds);

    return hash(password, salt);
  }

  makeUsername(firstName: string, lastName: string): string {
    const maxLastNameLength: number = 7;

    const lastNameUsername = lastName.slice(
      0,
      Math.min(maxLastNameLength, lastName.length),
    );
    return `${firstName[0]}${lastNameUsername}`;
  }

  // Generate a 6 digits otp password
  generateOTP(): string {
    const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let otp = '';

    for (let i = 0; i < 6; i++) {
      otp += digits[Math.floor(Math.random() * digits.length)];
    }
    return otp;
  }

  createExpiryDateInMinutes(minutes: number): Date {
    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + minutes);

    return expiryDate;
  }

  hasExpired(expiryDate: Date): boolean {
    const date = new Date();

    return date.getTime() > expiryDate.getTime();
  }
}
