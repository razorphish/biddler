import { ExecutionContext, Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuardOptions, localGuardDefaultOptions } from './local.types';
import { merge } from 'lodash';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor(options?: LocalAuthGuardOptions) {
    super(
      merge(localGuardDefaultOptions, options, {
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

export function UseLocalAuth(options?: LocalAuthGuardOptions) {
  return UseGuards(new LocalAuthGuard(options));
}
