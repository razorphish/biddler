import { ExecutionContext, Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class ClientPasswordAuthGuard extends AuthGuard('oauth2-client-password') {
  canActivate(context: ExecutionContext) {
    // Authenticate
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    console.log('made it');
    console.log('err', err);
    console.log('user', user);

    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    return user;
  }
}

export function UseClientPasswordAuth() {
  return UseGuards(new ClientPasswordAuthGuard());
}
