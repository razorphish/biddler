import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  magicCallbackUrl: process.env.MAGIC_CALLBACK_URL,
  magicAlgorithm: process.env.MAGIC_ALGORITHM,
  magicExpiresIn: process.env.MAGIC_EXPIRES_IN,
  magicIssuer: process.env.MAGIC_ISSUER,
  magicEmailSubject: process.env.MAGIC_EMAIL_SUBJECT,
  magicEmailFrom: process.env.MAGIC_EMAIL_FROM,
  magicEmailTemplate: process.env.MAGIC_EMAIL_TEMPLATE,
  oktaAudience: process.env.OKTA_AUDIENCE,
  oktaClientID: process.env.OKTA_CLIENT_ID,
  oktaSecret: process.env.OKTA_SECRET,
  oktaScope: process.env.OKTA_SCOPE.split(' '),
  oktaCallbackURL: process.env.OKTA_CALLBACK_URL,
  oktaAuthorizationId: process.env.OKTA_AUTHORIZATION_ID,
  facebookClientID: process.env.FACEBOOK_CLIENT_ID,
  facebookClientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  facebookCallbackURL: process.env.FACEBOOK_CALLBACK_URL,
  twitterConsumerKey: process.env.TWITTER_CONSUMER_KEY,
  twitterConsumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  twitterCallbackURL: process.env.TWITTER_CALLBACK_URL,
  githubClientID: process.env.GITHUB_CLIENT_ID,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
  githubCallbackURL: process.env.GITHUB_CALLBACK_URL,
  linkedinClientID: process.env.LINKEDIN_CLIENT_ID,
  linkedinClientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  linkedinCallbackURL: process.env.LINKEDIN_CALLBACK_URL,
  linkedinScope: process.env.LINKEDIN_SCOPE.split(' ')
}));
