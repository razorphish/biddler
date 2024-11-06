import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { OktaAuthModuleOptions, OktaAuthModuleOptionsFactory } from './okta.types';

@Injectable()
export class OktaAuthConfig implements OktaAuthModuleOptionsFactory {
  constructor(private configService: ConfigService) {}

  createModuleOptions(): OktaAuthModuleOptions {
    return {
      audience: this.configService.getOrThrow('auth.oktaAudience'),
      clientID: this.configService.getOrThrow('auth.oktaClientID'),
      clientSecret: this.configService.getOrThrow('auth.oktaSecret'),
      scope: this.configService.getOrThrow('auth.oktaScope'),
      callbackURL: this.configService.getOrThrow('auth.oktaCallbackURL')
      // authorizationId: this.configService.getOrThrow('auth.oktaAuthorizationId')
    };
  }
}
