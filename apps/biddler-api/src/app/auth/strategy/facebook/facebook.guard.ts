import { ExecutionContext, Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { merge } from 'lodash';
import { FacebookAuthGuardOptions, facebookGuardDefaultOptions } from './facebook.types';

@Injectable()
class FacebookAuthGuard extends AuthGuard('facebook') {
  constructor(options?: FacebookAuthGuardOptions) {
    super(
      merge(facebookGuardDefaultOptions, options, {
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

export function UseFacebookAuth(options?: FacebookAuthGuardOptions) {
  return UseGuards(new FacebookAuthGuard(options));
}
