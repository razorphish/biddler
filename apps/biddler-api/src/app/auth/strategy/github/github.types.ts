import { Request } from 'express';
import { StrategyOptions, StrategyOptionsWithRequest, Profile } from 'passport-github2';

type GithubAuthStrategyOptionsWithoutRequest = {
  [K in keyof StrategyOptions]: StrategyOptions[K];
};

type GithubAuthStrategyOptionsWithRequest = {
  [K in keyof StrategyOptionsWithRequest]: StrategyOptionsWithRequest[K];
};

export type GithubAuthModuleOptions =
  | GithubAuthStrategyOptionsWithoutRequest
  | GithubAuthStrategyOptionsWithRequest;

export type GithubAuthGuardOptions = object;

export const githubGuardDefaultOptions = {};

export interface GithubAuthModuleOptionsFactory {
  createModuleOptions(): Promise<GithubAuthModuleOptions> | GithubAuthModuleOptions;
}

export interface GithubAuthResult {
  originalRequest: Request;
  accessToken: string;
  refreshToken: string;
  profile: Profile;
}
