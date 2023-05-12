export const oAuthConfig = {
  OAUTH2_ACCESS_TOKEN_DURATION: process.env.OAUTH2_ACCESS_TOKEN_DURATION || 900,
  OAUTH2_BASE_URL:
    process.env.OAUTH2_BASE_URL || 'https://hpt-api.cms.gov/idm/auth/oauth2',
  OAUTH2_ISSUER:
    process.env.OAUTH2_BASE_URL || 'https://hpt-api.cms.gov/idm/auth/oauth2',
  OAUTH2_AUDIENCE: process.env.OAUTH2_AUDIENCE || 'https://hpt-api.cms.gov',
  JWT_SIG_PVT_KEY: process.env.JWT_SIG_PVT_KEY
    ? Buffer.from(process.env.JWT_SIG_PVT_KEY, 'base64').toString()
    : '',
  JWT_SIG_PUB_KEY: process.env.JWT_SIG_PUB_KEY
    ? Buffer.from(process.env.JWT_SIG_PUB_KEY, 'base64').toString()
    : '',
  JWTSignOptions: {}
};

oAuthConfig.JWTSignOptions = {
  issuer: oAuthConfig.OAUTH2_ISSUER,
  audience: oAuthConfig.OAUTH2_AUDIENCE,
  expiresIn: `${oAuthConfig.OAUTH2_ACCESS_TOKEN_DURATION}s`,
  algorithm: 'RS256'
};
