import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail() {
    return await this.mailerService.sendMail({
      to: 'marasco27@hotmail.com',
      from: 'david@maras.co',
      subject: 'CCLF',
      template: 'mail-magic-link',
      context: { name: 'MIFOO', url: 'www.maras.co' }
    });
  }
}
