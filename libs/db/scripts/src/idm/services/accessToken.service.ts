import { AllAccessTokenFilters } from '../dal/types';
import jwt from 'jsonwebtoken';
import { oAuthConfig } from '../common/auth-config.const';
import { AccessTokenPayload } from '../models';
import { AccessTokenOutput } from '../models/accessToken.model';
import * as accessTokenDAL from '../dal/models/accessToken.dal';

export const byToken = (token: string): AccessTokenPayload => {
  return jwt.verify(
    token,
    oAuthConfig.JWT_SIG_PUB_KEY,
    oAuthConfig.JWTSignOptions
  ) as AccessTokenPayload;
};

export const all = (filters: AllAccessTokenFilters): Promise<AccessTokenOutput[]> => {
  return accessTokenDAL.all(filters);
};
