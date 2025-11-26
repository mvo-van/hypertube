import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';
import { MailArguments } from './interfaces/mail-arguments.interface';

@Injectable()
export class MailerService {
  constructor(private readonly configService: ConfigService) {}

  async sendMail(mailArgs: MailArguments) {
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: this.configService.get<string>('MAIL'),
        pass: this.configService.get<string>('MAIL_PASSWORD'),
      },
    });

    const { to, subject, html } = mailArgs;

    return new Promise((resolve, reject) => {
      transport.sendMail(
        {
          from: process.env.MAIL_USERNAME,
          to: to,
          subject: subject,
          html: html,
        },
        (err, info) => {
          if (err) reject(err);
          else resolve(info);
        },
      );
    });
  }
}
