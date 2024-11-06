/* eslint-disable @nx/enforce-module-boundaries */
import { Injectable, UnauthorizedException, Logger, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BasicAuthModuleOptions, BasicAuthResult } from './basic.types';
import { BasicStrategy } from 'passport-http';
import { IDM } from '@biddler/db';
import { compare } from 'bcrypt';
import { BASIC_HYBRID_AUTH_OPTIONS } from './basic.constants';
import { merge } from 'lodash';

@Injectable()
export class BasicAuthStrategy extends PassportStrategy(BasicStrategy, 'basic') {
  constructor(
    private readonly _service: IDM.services.UserService,
    @Inject(BASIC_HYBRID_AUTH_OPTIONS) options: BasicAuthModuleOptions
  ) {
    super(
      merge(options, {
        passReqToCallback: true
      }) as BasicAuthModuleOptions
    );
  }

  async validate(request: Request, username: string, password: string, issued: any) {
    // 1. Authenticate
    const user = await this._service.byUsername(username, {
      attributes: { include: ['username', 'password', 'id'] }
    });

    // 2. Determine if user exists
    if (!user) {
      issued(new UnauthorizedException('User does not exist'));
    }

    // 3. Check password
    const compareHash = await compare(password, user.password);
    if (!compareHash) {
      issued(new UnauthorizedException('Invalid user'));
    }

    return issued(null, {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email
    } as BasicAuthResult);
  }
}
