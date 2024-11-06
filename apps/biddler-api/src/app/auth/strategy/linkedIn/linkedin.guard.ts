import { ExecutionContext, Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { merge } from 'lodash';
import { LinkedinAuthGuardOptions, linkedinGuardDefaultOptions } from './linkedin.types';

@Injectable()
class LinkedinAuthGuard extends AuthGuard('linkedin') {
  constructor(options?: LinkedinAuthGuardOptions) {
    super(
      merge(linkedinGuardDefaultOptions, options, {
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

export function UseLinkedinAuth(options?: LinkedinAuthGuardOptions) {
  return UseGuards(new LinkedinAuthGuard(options));
}
