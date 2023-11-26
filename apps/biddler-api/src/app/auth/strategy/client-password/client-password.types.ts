// eslint-disable-next-line @nx/enforce-module-boundaries
import { StrategyOptionsWithRequestInterface } from 'passport-oauth2-client-password';

type ClientPasswordAuthStrategyOptionsWithRequest = {
  [K in keyof StrategyOptionsWithRequestInterface]: StrategyOptionsWithRequestInterface[K];
};

export type ClientPasswordAuthModuleOptions = ClientPasswordAuthStrategyOptionsWithRequest;

export type ClientPasswordAuthGuardOptions = object;

export const clientPasswordGuardDefaultOptions = {};

export interface ClientPasswordAuthModuleOptionsFactory {
  createModuleOptions(): Promise<ClientPasswordAuthModuleOptions> | ClientPasswordAuthModuleOptions;
}

export interface ClientPasswordAuthResult {
  access_token?: string;
  token_type?: string;
  expires_in?: number;
  refresh_token?: string;
  scope?: string;
}
