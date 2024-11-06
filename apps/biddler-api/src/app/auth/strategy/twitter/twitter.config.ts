import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { TwitterAuthModuleOptions, TwitterAuthModuleOptionsFactory } from './twitter.types';

@Injectable()
export class TwitterAuthConfig implements TwitterAuthModuleOptionsFactory {
  constructor(private configService: ConfigService) {}

  createModuleOptions(): TwitterAuthModuleOptions {
    return {
      consumerKey: this.configService.getOrThrow('auth.twitterConsumerKey'),
      consumerSecret: this.configService.getOrThrow('auth.twitterConsumerSecret'),
      callbackURL: this.configService.getOrThrow('auth.twitterCallbackURL')
    };
  }
}
