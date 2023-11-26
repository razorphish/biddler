import { Request } from 'express';
import { BasicStrategyOptions, BasicStrategyOptionsWithRequest } from './basic.interface';

type BasicAuthStrategyOptionsWithoutRequest = {
  [K in keyof BasicStrategyOptions]: BasicStrategyOptions[K];
};

type BasicAuthStrategyOptionsWithRequest = {
  [K in keyof BasicStrategyOptionsWithRequest]: BasicStrategyOptionsWithRequest[K];
};

export type BasicAuthModuleOptions =
  | BasicAuthStrategyOptionsWithoutRequest
  | BasicAuthStrategyOptionsWithRequest;

export type BasicAuthGuardOptions = object;

export const basicGuardDefaultOptions = {};

export interface BasicAuthModuleOptionsFactory {
  createModuleOptions(): Promise<BasicAuthModuleOptions> | BasicAuthModuleOptions;
}

export interface BasicAuthResult {
  originalRequest: Request;
  firstName: string;
  username: string;
  lastName: string;
  email: string;
}
