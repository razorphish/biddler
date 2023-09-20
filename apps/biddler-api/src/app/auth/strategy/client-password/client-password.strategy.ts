import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2-client-password';
import { ClientPasswordAuthResult } from './client-password.types';

@Injectable()
export class ClientPasswordAuthStrategy extends PassportStrategy(
  Strategy,
  'oauth2-client-password'
) {
  async validate(originalRequest: any, clientID: string, clientSecret: string) {
    return {} as ClientPasswordAuthResult;
  }
}
