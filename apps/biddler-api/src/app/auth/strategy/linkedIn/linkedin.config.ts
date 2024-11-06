import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { LinkedinAuthModuleOptions, LinkedinAuthModuleOptionsFactory } from './linkedin.types';

@Injectable()
export class LinkedinAuthConfig implements LinkedinAuthModuleOptionsFactory {
  constructor(private configService: ConfigService) {}

  createModuleOptions(): LinkedinAuthModuleOptions {
    return {
      clientID: this.configService.getOrThrow('auth.linkedinClientID'),
      clientSecret: this.configService.getOrThrow('auth.linkedinClientSecret'),
      callbackURL: this.configService.getOrThrow('auth.linkedinCallbackURL'),
      scope: this.configService.getOrThrow('auth.linkedinScope')
    };
  }
}
