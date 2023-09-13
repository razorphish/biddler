import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class MagicAuthGuard extends AuthGuard(['magiclogin']) {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    // Authenticate
    console.log('[MagicAuthGuard]::canActivate() authenticating.....');
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    console.log('err', err);
    console.log('user', user);
    console.log('info', info);
    if (err || !user) {
      throw err || new UnauthorizedException(info[0]);
    }

    return user;
  }
}
