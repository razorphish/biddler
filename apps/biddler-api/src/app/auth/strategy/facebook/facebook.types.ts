import { Request } from 'express';
import { StrategyOptions, StrategyOptionsWithRequest, Profile } from 'passport-facebook';

type FacebookAuthStrategyOptionsWithoutRequest = {
  [K in keyof StrategyOptions]: StrategyOptions[K];
};

type FacebookAuthStrategyOptionsWithRequest = {
  [K in keyof StrategyOptionsWithRequest]: StrategyOptionsWithRequest[K];
};

export type FacebookAuthModuleOptions =
  | FacebookAuthStrategyOptionsWithoutRequest
  | FacebookAuthStrategyOptionsWithRequest;

export type FacebookAuthGuardOptions = object;

export const facebookGuardDefaultOptions = {};

export interface FacebookAuthModuleOptionsFactory {
  createModuleOptions(): Promise<FacebookAuthModuleOptions> | FacebookAuthModuleOptions;
}

export interface FacebookAuthResult {
  originalRequest: Request;
  accessToken: string;
  refreshToken: string;
  profile: Profile;
}
