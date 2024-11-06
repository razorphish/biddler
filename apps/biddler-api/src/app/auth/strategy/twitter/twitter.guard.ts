import { ExecutionContext, Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { merge } from 'lodash';
import { TwitterAuthGuardOptions, twitterGuardDefaultOptions } from './twitter.types';

@Injectable()
class TwitterAuthGuard extends AuthGuard('twitter') {
  constructor(options?: TwitterAuthGuardOptions) {
    super(
      merge(twitterGuardDefaultOptions, options, {
        property: 'hybridAuthResult'
      })
    );
  }

  canActivate(context: ExecutionContext) {
    // Authenticate
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException(info[0]);
    }

    return user;
  }
}

export function UseTwitterAuth(options?: TwitterAuthGuardOptions) {
  return UseGuards(new TwitterAuthGuard(options));
}
