export interface _BasicStrategyOptionsBase {
  realm?: string;
}

export interface BasicStrategyOptions extends _BasicStrategyOptionsBase {
  passReqToCallback?: false | undefined;
}
export interface BasicStrategyOptionsWithRequest {
  passReqToCallback: true;
}
