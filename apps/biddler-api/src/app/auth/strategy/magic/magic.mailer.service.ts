import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MagicMailService {
  constructor(
    private configService: ConfigService,
    private readonly mailerService: MailerService
  ) {}

  async sendMail(name: string, toEmail: string, destination: string) {
    return await this.mailerService.sendMail({
      to: toEmail,
      from: this.configService.getOrThrow('auth.magicEmailFrom'),
      subject: this.configService.getOrThrow('auth.magicEmailSubject'),
      template: this.configService.getOrThrow('auth.magicEmailTemplate'),
      context: { name: name, url: destination }
    });
  }
}
