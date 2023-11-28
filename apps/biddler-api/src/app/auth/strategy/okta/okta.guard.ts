import { ExecutionContext, Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { merge } from 'lodash';
import { OktaAuthGuardOptions, oktaGuardDefaultOptions } from './okta.types';

@Injectable()
export class OktaAuthGuard extends AuthGuard(['okta']) {
  constructor(options?: OktaAuthGuardOptions) {
    super(
      merge(oktaGuardDefaultOptions, options, {
        property: 'hybridAuthResult'
      })
    );
  }

  canActivate(context: ExecutionContext) {
    // Authenticate
    return super.canActivate(context);
  }

  handleRequest(err, req, info) {
    if (err || !req.profile) {
      throw err || new UnauthorizedException();
    }

    return req;
  }
}

export function UseOktaAuth(options?: OktaAuthGuardOptions) {
  return UseGuards(new OktaAuthGuard(options));
}
