import { Request } from 'express';

export type LocalAuthModuleOptions = {
  usernameField: 'username';
  passwordField: 'password';
  session: false;
  passReqToCallback: false;
  badRequestMessage: 'Missing credentialss';
};

export type LocalAuthGuardOptions = object;

export const localGuardDefaultOptions = {};

export interface LocalAuthModuleOptionsFactory {
  createModuleOptions(): Promise<LocalAuthModuleOptions> | LocalAuthModuleOptions;
}

export interface LocalAuthResult {
  originalRequest: Request;
  firstName: string;
  username: string;
  lastName: string;
  email: string;
}
