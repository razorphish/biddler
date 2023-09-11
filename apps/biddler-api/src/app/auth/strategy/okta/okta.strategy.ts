import { Strategy, OktaProfile, OktaStrategyOptions } from 'passport-okta-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OktaStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const options: OktaStrategyOptions = {
      audience: 'https://acme.okta.com',
      clientID: 'oa6qp1vkvrgwABC12345',
      clientSecret: 'qwertyA-fooBazB_DQSS-qqsQSD123',
      scope: [], // ['openid', 'email', 'profile'],
      callbackURL: 'http://localhost:3000/api/auth/okta/callback'
    };
    super(options);
  }

  async validate(accessToken: string, refreshToken, profile, done) {
    const _profile: OktaProfile = profile;
    return done(null, _profile);
  }
}
