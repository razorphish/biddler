import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ClientPasswordAuthGuardOptions,
  clientPasswordGuardDefaultOptions
} from './client-password.types';
import { merge } from 'lodash';

@Injectable()
export class ClientPasswordAuthGuard extends AuthGuard('oauth2-client-password') {
  constructor(options?: ClientPasswordAuthGuardOptions) {
    super(
      merge(clientPasswordGuardDefaultOptions, options, {
        property: 'hybridAuthResult'
      })
    );
  }

  canActivate(context: ExecutionContext) {
    // Authenticate
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}

export function UseClientPasswordAuth(options?: ClientPasswordAuthGuardOptions) {
  return UseGuards(new ClientPasswordAuthGuard(options));
}
