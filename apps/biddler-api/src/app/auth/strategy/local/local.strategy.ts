/* eslint-disable @nx/enforce-module-boundaries */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { LocalAuthResult } from './local.types';
import { Strategy } from 'passport-local';
import { UserService } from 'libs/db/src/idm/services';
import { compare } from 'bcrypt';

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _service: UserService) {
    super();
  }

  async validate(username: string, password: string) {
    // 1. Authenticate
    const user = await this._service.byUsername(username, {
      attributes: { include: ['username', 'password', 'id'] }
    });

    // 2. Determine if user exists
    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    // 3. Check password
    const compareHash = await compare(password, user.password);
    if (!compareHash) {
      throw new UnauthorizedException('Invalid user');
    }

    return {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email
    } as LocalAuthResult;
  }
}
