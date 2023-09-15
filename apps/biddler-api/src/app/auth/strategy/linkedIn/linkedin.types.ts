import { Request } from 'express';
import { StrategyOption, StrategyOptionWithRequest, Profile } from 'passport-linkedin-oauth2';

type LinkedinAuthStrategyOptionsWithoutRequest = {
  [K in keyof StrategyOption]: StrategyOption[K];
};

type LinkedinAuthStrategyOptionsWithRequest = {
  [K in keyof StrategyOptionWithRequest]: StrategyOptionWithRequest[K];
};

export type LinkedinAuthModuleOptions =
  | LinkedinAuthStrategyOptionsWithoutRequest
  | LinkedinAuthStrategyOptionsWithRequest;

export type LinkedinAuthGuardOptions = object;

export const linkedinGuardDefaultOptions = {
  scope: ['openid', 'profile', 'email'],
  state: true
};

export interface LinkedinAuthModuleOptionsFactory {
  createModuleOptions(): Promise<LinkedinAuthModuleOptions> | LinkedinAuthModuleOptions;
}

export interface LinkedinAuthResult {
  originalRequest: Request;
  accessToken: string;
  refreshToken: string;
  profile: Profile;
}
