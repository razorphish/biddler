/* eslint-disable @nx/enforce-module-boundaries */
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
    console.log('Need to validate teh credentials!!!');
    console.log('ClientID', clientID);
    console.log('ClientSecret', clientSecret);
    return {} as ClientPasswordAuthResult;
  }
}
