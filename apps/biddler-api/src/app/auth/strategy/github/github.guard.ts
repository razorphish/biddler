import { ExecutionContext, Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { merge } from 'lodash';
import { GithubAuthGuardOptions, githubGuardDefaultOptions } from './github.types';

@Injectable()
class GithubAuthGuard extends AuthGuard('github') {
  constructor(options?: GithubAuthGuardOptions) {
    super(
      merge(githubGuardDefaultOptions, options, {
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

export function UseGithubAuth(options?: GithubAuthGuardOptions) {
  return UseGuards(new GithubAuthGuard(options));
}
