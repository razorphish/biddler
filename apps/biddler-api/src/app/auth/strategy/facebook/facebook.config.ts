import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { FacebookAuthModuleOptions, FacebookAuthModuleOptionsFactory } from './facebook.types';

@Injectable()
export class FacebookAuthConfig implements FacebookAuthModuleOptionsFactory {
  constructor(private configService: ConfigService) {}

  createModuleOptions(): FacebookAuthModuleOptions {
    return {
      clientKey: this.configService.getOrThrow('auth.facebookClientID'),
      clientSecret: this.configService.getOrThrow('auth.facebookClientSecret'),
      callbackURL: this.configService.getOrThrow('auth.facebookCallbackURL')
    };
  }
}
