import { ExecutionContext, Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BasicAuthGuardOptions, basicGuardDefaultOptions } from './basic.types';
import { merge } from 'lodash';

@Injectable()
export class BasicAuthGuard extends AuthGuard('basic') {
  constructor(options?: BasicAuthGuardOptions) {
    super(merge(basicGuardDefaultOptions, options));
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

export function UseBasicAuth(options?: BasicAuthGuardOptions) {
  return UseGuards(new BasicAuthGuard(options));
}
