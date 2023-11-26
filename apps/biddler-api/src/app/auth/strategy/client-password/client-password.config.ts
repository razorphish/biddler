import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import {
  ClientPasswordAuthModuleOptions,
  ClientPasswordAuthModuleOptionsFactory
} from './client-password.types';

@Injectable()
export class ClientPasswordAuthConfig implements ClientPasswordAuthModuleOptionsFactory {
  constructor(private configService: ConfigService) {}

  createModuleOptions(): ClientPasswordAuthModuleOptions {
    return {
      passReqToCallback: this.configService.getOrThrow('auth.clientPasswordPassReqToCallback')
    };
  }
}
