import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { GithubAuthModuleOptions, GithubAuthModuleOptionsFactory } from './github.types';

@Injectable()
export class GithubAuthConfig implements GithubAuthModuleOptionsFactory {
  constructor(private configService: ConfigService) {}

  createModuleOptions(): GithubAuthModuleOptions {
    return {
      clientID: this.configService.getOrThrow('auth.githubClientID'),
      clientSecret: this.configService.getOrThrow('auth.githubClientSecret'),
      callbackURL: this.configService.getOrThrow('auth.githubCallbackURL')
    };
  }
}
