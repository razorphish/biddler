import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { LocalAuthModuleOptions, LocalAuthModuleOptionsFactory } from './local.types';

@Injectable()
export class LocalAuthConfig implements LocalAuthModuleOptionsFactory {
  constructor(private configService: ConfigService) {}

  createModuleOptions(): LocalAuthModuleOptions {
    return {
      usernameField: this.configService.getOrThrow('auth.localUsernameField'),
      passwordField: this.configService.getOrThrow('auth.localPasswordField'),
      session: this.configService.getOrThrow('auth.localSession'),
      passReqToCallback: this.configService.getOrThrow('auth.localPassReqToCallback'),
      badRequestMessage: this.configService.getOrThrow('auth.localBadRequestMessage')
    };
  }
}
