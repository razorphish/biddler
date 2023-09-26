import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';
import { Public } from '../../common/decorators/meta/IS_PUBLIC_KEY.meta';

@Controller()
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get()
  @Public()
  async sendMail(): Promise<any[]> {
    return await this.mailService.sendMail();
  }
}
