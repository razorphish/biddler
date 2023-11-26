/* eslint-disable @nx/enforce-module-boundaries */
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BasicAuthResult } from './basic.types';
import { BasicStrategy } from 'passport-http';
import { IDM } from '@biddler/db';
import { compare } from 'bcrypt';

@Injectable()
export class BasicAuthStrategy extends PassportStrategy(BasicStrategy, 'basic') {
  constructor(private readonly _service: IDM.services.UserService) {
    super();
  }

  async verify(username: string, password: string, done: void) {
    Logger.log('LOG *** userRepo.authenticate [Strategy:Basic]');
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
    } as BasicAuthResult;
  }
}
