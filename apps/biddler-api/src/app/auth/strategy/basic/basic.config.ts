import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { BasicAuthModuleOptions, BasicAuthModuleOptionsFactory } from './basic.types';

@Injectable()
export class BasicAuthConfig implements BasicAuthModuleOptionsFactory {
  constructor(private configService: ConfigService) {}

  createModuleOptions(): BasicAuthModuleOptions {
    return {
      realm: this.configService.getOrThrow('auth.basicRealm'),
      passReqToCallback: this.configService.getOrThrow('auth.basicPassReqToCallback')
    };
  }
}
